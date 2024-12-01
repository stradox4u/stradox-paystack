import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "@std/testing/mock";
import { faker } from "@faker-js/faker";

describe("Unit Tests for Terminal", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly send an event to the terminal", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const terminalId = "TT_1234567890";
    const body = {
      type: "invoice" as const,
      action: "process" as const,
      data: {
        id: "INV_1234567890",
        reference: "OPLKJHGF",
      },
    };

    const expectedUrl = `${baseUrl}/terminal/${terminalId}/event`;

    await paystack.terminal.sendEvent(terminalId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly fetch an event's status", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const terminalId = "TT_1234567890";
    const eventId = "EV_1234567890";

    const expectedUrl = `${baseUrl}/terminal/${terminalId}/event/${eventId}`;

    await paystack.terminal.fetchEventStatus(terminalId, eventId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a terminal's status", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const terminalId = "TT_1234567890";
    const expectedUrl = `${baseUrl}/terminal/${terminalId}/presence`;

    await paystack.terminal.fetchStatus(terminalId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly list terminals", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const queries = {
      perPage: 10,
      page: 1,
    };
    const expectedUrl = `${baseUrl}/terminal`;

    await paystack.terminal.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      `${expectedUrl}?perPage=${queries.perPage}&page=${queries.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly fetch a terminal", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const terminalId = "TT_1234567890";
    const expectedUrl = `${baseUrl}/terminal/${terminalId}`;

    await paystack.terminal.fetch(terminalId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a terminal", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const terminalId = "TT_1234567890";
    const body = {
      name: "My Terminal",
      address: faker.location.streetAddress(),
    };

    const expectedUrl = `${baseUrl}/terminal/${terminalId}`;

    await paystack.terminal.update(terminalId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly commission a terminal", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      serial_number: faker.string.numeric(12),
    };

    const expectedUrl = `${baseUrl}/terminal/commission_device`;

    await paystack.terminal.commission(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly decommission a terminal", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      serial_number: faker.string.numeric(12),
    };

    const expectedUrl = `${baseUrl}/terminal/decommission_device`;

    await paystack.terminal.decommission(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });
});
