import { beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockImplementation(() => {
    throw new Error("Unexpected network request in an offline unit test");
  });
});
