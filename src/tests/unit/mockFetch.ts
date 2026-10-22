import { vi } from "vitest";

export const TEST_SECRET_KEY = "sk_test_unit_tests_only";

export function mockPaystackFetch(
  body: unknown = { status: false, message: "Some message from server" },
) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    }),
  );
}
