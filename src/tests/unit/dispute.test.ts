import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "jsr:@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Dispute", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly list disputes", async () => {
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
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
      status: "awaiting-bank-feedback" as const,
      transaction: "TRF_1k2k3k4k5k6k7k8k9k0k",
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/dispute`);

    await paystack.dispute.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a dispute", async () => {
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

    const disputeId = "DS_1k2k3k4k5k6k7k8k9k0k";
    const expectedUrl = `${baseUrl}/dispute/${disputeId}`;

    await paystack.dispute.fetch(disputeId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly list a transaction's disputes", async () => {
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

    const transactionId = "TRF_1k2k3k4k5k6k7k8k9k0k";
    const expectedUrl = `${baseUrl}/dispute/transaction/${transactionId}`;

    await paystack.dispute.listTransactionDisputes(transactionId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a dispute", async () => {
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

    const disputeId = "DS_1k2k3k4k5k6k7k8k9k0k";
    const body = {
      refund_amount: 1_000_000,
      uploaded_filename: "file.pdf",
    };
    const expectedUrl = `${baseUrl}/dispute/${disputeId}`;

    await paystack.dispute.update(disputeId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly add evidence to a dispute", async () => {
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

    const disputeId = "DS_1k2k3k4k5k6k7k8k9k0k";
    const body = {
      customer_email: "johndoe@test.com",
      customer_name: "John Doe",
      customer_phone: "+2340000000000",
      service_details: "Service details",
      delivery_address: "Delivery address",
      delivery_date: "2021-12-31",
    };
    const expectedUrl = `${baseUrl}/dispute/${disputeId}/evidence`;

    await paystack.dispute.addEvidence(disputeId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly get an upload URL", async () => {
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

    const disputeId = "DS_1k2k3k4k5k6k7k8k9k0k";
    const queries = {
      upload_filename: "evidence.pdf",
    };

    const expectedUrl = attachQueries(
      queries,
      `${baseUrl}/dispute/${disputeId}/upload_url`,
    );

    await paystack.dispute.getUploadUrl(disputeId, queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly resolve a dispute", async () => {
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

    const disputeId = "DS_1k2k3k4k5k6k7k8k9k0k";
    const body = {
      resolution: "declined" as const,
      message: "Dishonest customer",
      refund_amount: 1_000_000,
      uploaded_filename: "file.pdf",
    };
    const expectedUrl = `${baseUrl}/dispute/${disputeId}/resolve`;

    await paystack.dispute.resolve(disputeId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly export disputes", async () => {
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
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/dispute/export`);

    await paystack.dispute.export(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });
});
