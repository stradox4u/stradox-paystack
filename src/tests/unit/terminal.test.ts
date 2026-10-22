import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";

describe("Unit Tests for Terminal", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly send an event to the terminal", async () => {
    const fetchStub = mockPaystackFetch();

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

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly fetch an event's status", async () => {
    const fetchStub = mockPaystackFetch();

    const terminalId = "TT_1234567890";
    const eventId = "EV_1234567890";

    const expectedUrl = `${baseUrl}/terminal/${terminalId}/event/${eventId}`;

    await paystack.terminal.fetchEventStatus(terminalId, eventId);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly fetch a terminal's status", async () => {
    const fetchStub = mockPaystackFetch();

    const terminalId = "TT_1234567890";
    const expectedUrl = `${baseUrl}/terminal/${terminalId}/presence`;

    await paystack.terminal.fetchStatus(terminalId);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly list terminals", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };
    const expectedUrl = `${baseUrl}/terminal`;

    await paystack.terminal.list(queries);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        `${expectedUrl}?perPage=${queries.perPage}&page=${queries.page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly fetch a terminal", async () => {
    const fetchStub = mockPaystackFetch();

    const terminalId = "TT_1234567890";
    const expectedUrl = `${baseUrl}/terminal/${terminalId}`;

    await paystack.terminal.fetch(terminalId);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly update a terminal", async () => {
    const fetchStub = mockPaystackFetch();

    const terminalId = "TT_1234567890";
    const body = {
      name: "My Terminal",
      address: faker.location.streetAddress(),
    };

    const expectedUrl = `${baseUrl}/terminal/${terminalId}`;

    await paystack.terminal.update(terminalId, body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly commission a terminal", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      serial_number: faker.string.numeric(12),
    };

    const expectedUrl = `${baseUrl}/terminal/commission_device`;

    await paystack.terminal.commission(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly decommission a terminal", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      serial_number: faker.string.numeric(12),
    };

    const expectedUrl = `${baseUrl}/terminal/decommission_device`;

    await paystack.terminal.decommission(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });
});
