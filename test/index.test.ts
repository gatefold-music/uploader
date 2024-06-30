import supertest from "supertest";

describe("Server", function () {
  // const request = supertest.agent(server);

  afterAll(done => {
    // server.close(done);
    done();
  });

  it("should get /", async () => {
    // const res = await request.get("/");
    // expect(res.status).toBe(200);
    // expect(res.body).toEqual({ data: "It Works!" });
  });
});
