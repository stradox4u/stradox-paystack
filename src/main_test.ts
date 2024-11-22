import { describe, it } from "jsr:@std/testing/bdd";
import {expect} from "jsr:@std/expect";

describe('main', () => {
  it('should run', () => {
    const result = (2 + 5);
    expect(result).toBe(7);
  });
});
