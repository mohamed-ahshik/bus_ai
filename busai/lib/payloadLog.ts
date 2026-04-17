const textEncoder = new TextEncoder();

/** UTF-8 byte length of `JSON.stringify(value)` (local size estimate). */
export function utf8JsonBytes(value: unknown): number {
  return textEncoder.encode(JSON.stringify(value)).length;
}

/** Local-only diagnostics; does not send data anywhere. */
export function logPayloadLocal(scope: string, detail: Record<string, unknown>): void {
  console.log(`[busai:payload] ${scope}`, detail);
}
