import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST To /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1body = await response1.json();

  expect(Array.isArray(response1body)).toBe(true);
  expect(response1body.length).toBeGreaterThan(0);
  expect(response1body[0].name).toBe("1765925517646_test-migration");
  expect(response1body[0].path).toBe(
    "infra/migrations/1765925517646_test-migration.js",
  );
  expect(response1body[0].timestamp).toBe(1765925517646);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2body = await response2.json();

  expect(Array.isArray(response2body)).toBe(true);
  expect(response2body.length).toBe(0);
});
