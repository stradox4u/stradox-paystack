import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";

describe("Feature Tests for Integration", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);

  it("Correctly fetches the list of banks", async () => {
    const response = await paystack.misc.listBanks({
      country: "nigeria" as const,
      use_cursor: true,
      perPage: 25,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Banks retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches the list of countries", async () => {
    const response = await paystack.misc.listCountries();

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Countries retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches the list of states", async () => {
    const response = await paystack.misc.listStates({
      country: "CA",
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("States retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });
});
