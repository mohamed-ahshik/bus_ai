import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Use POST" }, 405);
  }

  try {
    const ltaKey = Deno.env.get("EXPO_PUBLIC_LTA_DATAMALL_KEY") ?? "";
    if (!ltaKey) {
      return jsonResponse({ ok: false, error: "LTA key not configured" }, 500);
    }

    const url = "https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts";
    const res = await fetch(url, {
      headers: { AccountKey: ltaKey, accept: "application/json" },
    });

    if (!res.ok) {
      return jsonResponse({ ok: false, error: `LTA error: ${res.status}` }, 502);
    }

    const data = (await res.json()) as { value?: unknown; Value?: unknown };
    const val = data.value ?? data.Value;

    let value: unknown[];
    if (Array.isArray(val)) {
      value = val;
    } else if (val != null && typeof val === "object") {
      const obj = val as Record<string, unknown>;
      const messages = obj.Message ?? obj.message;
      if (Array.isArray(messages)) {
        const parentStatus = obj.Status ?? obj.status;
        value = messages.filter((x): x is Record<string, unknown> => x != null && typeof x === "object").map((m) => ({
          ...m,
          Status: m.Status ?? m.status ?? parentStatus,
        }));
      } else {
        value = [];
      }
    } else {
      value = [];
    }

    return jsonResponse({ ok: true, value });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
