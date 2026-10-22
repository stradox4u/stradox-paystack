import { describe, expect, it } from "vitest";
import { Paystack, getPaystack } from "../../main.js";

describe("main", () => {
  it("should instantiate Paystack class from class import", () => {
    const paystack = new Paystack("sk_test_1234567890");
    expect(paystack).toBeInstanceOf(Paystack);
  });

  it("should instantiate Paystack class from function import", () => {
    const paystack = getPaystack("sk_test_1234567890");
    expect(paystack).toBeInstanceOf(Paystack);
  });
});
