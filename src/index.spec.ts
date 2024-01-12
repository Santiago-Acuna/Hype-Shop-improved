import request from "supertest";
import { serverInstance } from "./index";

describe("Test del servidor en el puerto 3000", () => {
  it("Debería responder correctamente en el puerto 3000", async () => {
    const response = await request(serverInstance.app).get("/status");

    expect(response.statusCode).toBe(200);
  });
});
