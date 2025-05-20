import "dotenv/config";
import { describe, test, expect } from "vitest";
import index from "../index";

test("should return all blog", async () => {
  const res = await index.request("/api/v1/blog/all");
  expect(res.status).toBe(200);
});
