import { beforeEach, expect } from "vitest";
import { validateIntegrationEnv } from "./integration-env.js";

validateIntegrationEnv(process.env);

beforeEach(() => {
  expect.hasAssertions();
});
