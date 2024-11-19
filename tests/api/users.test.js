const request = require("supertest");
const app = require("../../index");
const userModel = require("../../models/user.model");
const { mongoDisconnect } = require("../../config/db/db.connection");

describe("Users API", () => {
  afterAll(() => {
    mongoDisconnect();
  });

  test("returns a list of users", async () => {
    const response = await request(app).get("/api/auth/getusers");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User data fetch successful!"
    );
    expect(response.body).toHaveProperty("users");
    const users = response.body.users;
    expect(Array.isArray(users)).toBe(true);
    users.forEach((user) => {
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("createdAt");
      expect(user).toHaveProperty("updatedAt");

      expect(new Date(user.createdAt).toString()).not.toBe("Invalid Date");
      expect(new Date(user.updatedAt).toString()).not.toBe("Invalid Date");
    });
  });

  test("creates a user", async () => {
    await userModel.deleteOne({ email: "anonymousUser@gmail.com" });

    const requestBody = {
      username: "anonymous user",
      email: "anonymousUser@gmail.com",
      password: "anonymoususer",
    };

    const response = await request(app)
      .post("/api/auth/create")
      .send(requestBody);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty(
      "message",
      "User creation successful!"
    );
    expect(response.body).toHaveProperty("user");

    const user = response.body.user;
    expect(user).toHaveProperty("email", "anonymousUser@gmail.com");
    expect(user).toHaveProperty("username", "anonymous user");

    expect(user).toHaveProperty("userID");
    expect(user.userID).toMatch(/^[0-9a-fA-F]{24}$/); // MongoDB ObjectID pattern

    expect(user).toHaveProperty("createdAt");
    expect(new Date(user.createdAt).toString()).not.toBe("Invalid Date");

    expect(user).toHaveProperty("updatedAt");
    expect(new Date(user.updatedAt).toString()).not.toBe("Invalid Date");
  });

  test("updates a user", async () => {
    const initialUser = await userModel.findOne({
      email: "anonymousUser@gmail.com",
    });
    const userID = initialUser._id;
    const testUser = await userModel.findByIdAndUpdate(userID, {
      $set: { username: "anonymous user" },
    });
    const requestBody = {
      username: "anonymous user2",
      userID: testUser._id,
    };
    const response = await request(app)
      .put("/api/auth/update")
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "User update successful!");
    expect(response.body).toHaveProperty("user");

    const user = response.body.user;
    expect(user).toHaveProperty("email", "anonymousUser@gmail.com");
    expect(user).toHaveProperty("username", "anonymous user2");

    expect(user).toHaveProperty("userID");
    expect(user.userID).toMatch(/^[0-9a-fA-F]{24}$/); // MongoDB ObjectID pattern

    expect(user).toHaveProperty("createdAt");
    expect(new Date(user.createdAt).toString()).not.toBe("Invalid Date");

    expect(user).toHaveProperty("updatedAt");
    expect(new Date(user.updatedAt).toString()).not.toBe("Invalid Date");
  });
});
