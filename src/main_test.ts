import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { Paystack, getPaystack } from "./main.ts";

describe('main', () => {
  it('should instantiate Paystack class from class import', () => {
    const paystack = new Paystack('sk_test_1234567890');
    expect(paystack).toBeInstanceOf(Paystack);
  });

  it('should instantiate Paystack class from function import', () => {
    const paystack = getPaystack('sk_test_1234567890');
    expect(paystack).toBeInstanceOf(Paystack);
  });
});
