import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { Paystack, createPaystack } from "./main.ts";

describe('main', () => {
  it('should instantiate Paystack class from class import', () => {
    const paystack = new Paystack('sk_test_1234567890');
    expect(paystack).toBeInstanceOf(Paystack);
  });

  it('should instantiate Paystack class from function import', () => {
    const paystack = createPaystack('sk_test_1234567890');
    expect(paystack).toBeInstanceOf(Paystack);
  });
});
