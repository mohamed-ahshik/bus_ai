import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LTA_URL = "https://datamall2.mytransport.sg/ltaodataservice/BusRoutes";
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
    const body = (await req.json()) as { skip?: number };
    const skip = typeof body.skip === "number" && body.skip >= 0 ? body.skip : 0;

    const ltaKey = Deno.env.get("EXPO_PUBLIC_LTA_DATAMALL_KEY") ?? "";
    if (!ltaKey) {
      return jsonResponse({ ok: false, error: "LTA key not configured" }, 500);
    }

    const res = await fetch(`${LTA_URL}?$skip=${skip}`, {
      headers: { AccountKey: ltaKey, accept: "application/json" },
    });

    if (!res.ok) {
      return jsonResponse({ ok: false, error: `LTA error: ${res.status}` }, 502);
    }

    const data = await res.json();
    return jsonResponse({ ok: true, value: data.value ?? [] });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
