const SUPPORTED_EVENTS = new Set(["PreCompact", "SessionStart", "Stop"]);

export async function readCodexHookSource(stream = process.stdin) {
  let input = "";
  for await (const chunk of stream) {
    input += chunk;
    if (input.length > 1024 * 1024)
      throw new Error("Codex hook input exceeded 1 MiB");
  }

  let value;
  try {
    value = JSON.parse(input);
  } catch {
    throw new Error("Codex hook input was not valid JSON");
  }

  if (!value || typeof value !== "object")
    throw new Error("Codex hook input must be an object");
  if (!SUPPORTED_EVENTS.has(value.hook_event_name)) {
    throw new Error(
      `Unsupported Codex hook event: ${String(value.hook_event_name)}`,
    );
  }
  if (typeof value.cwd !== "string" || value.cwd.length === 0) {
    throw new Error("Codex hook input did not include cwd");
  }

  return {
    kind: "codex-official-hook",
    event: value.hook_event_name,
    cwd: value.cwd,
    sessionId: typeof value.session_id === "string" ? value.session_id : null,
    turnId: typeof value.turn_id === "string" ? value.turn_id : null,
    trigger: typeof value.trigger === "string" ? value.trigger : null,
    source: typeof value.source === "string" ? value.source : null,
    stopHookActive: value.stop_hook_active === true,
    // Official hook input currently exposes no token count or remaining percentage.
    tokenUsage: null,
  };
}
