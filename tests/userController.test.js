import bcrypt from "bcryptjs";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from "../controllers/userController.js";
import User from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/token.js";

// Mock the dependencies
jest.mock("../models/userModel.js");
jest.mock("../utils/token.js");

describe("User Controller", () => {
  let h;

  beforeEach(() => {
    h = {
      response: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
      unstate: jest.fn(),
    };
  });

  describe("registerUser", () => {
    it("should register a user successfully", async () => {
      User.findOne.mockResolvedValue(null); // No existing user
      User.create.mockResolvedValue({ id: 1, username: "testUser" });
      bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");

      await registerUser(
        { payload: { username: "testUser", password: "123456" } },
        h
      );

      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "testUser" },
      });
      expect(User.create).toHaveBeenCalledWith({
        username: "testUser",
        password: "hashedPassword",
      });
      expect(generateTokenAndSetCookie).toHaveBeenCalled();
      expect(h.response).toHaveBeenCalledWith({
        success: true,
        message: "User registered successfully",
        data: { id: 1, username: "testUser" },
      });
      expect(h.code).toHaveBeenCalledWith(201);
    });

    it("should return conflict if user already exists", async () => {
      User.findOne.mockResolvedValue({ id: 1, username: "testUser" });

      await registerUser(
        { payload: { username: "testUser", password: "123456" } },
        h
      );

      expect(h.response).toHaveBeenCalledWith({
        success: false,
        message: "User already exists",
        data: null,
      });
      expect(h.code).toHaveBeenCalledWith(409);
    });
  });

  describe("loginUser", () => {
    it("should log in a user successfully", async () => {
      User.findOne.mockResolvedValue({
        id: 1,
        username: "testUser",
        password: "hashedPassword",
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      await loginUser(
        { payload: { username: "testUser", password: "123456" } },
        h
      );

      expect(generateTokenAndSetCookie).toHaveBeenCalled();
      expect(h.response).toHaveBeenCalledWith({
        success: true,
        message: "Login successful",
        data: { id: 1, username: "testUser", password: "hashedPassword" },
      });
      expect(h.code).toHaveBeenCalledWith(200);
    });

    it("should return error if user does not exist", async () => {
      User.findOne.mockResolvedValue(null);

      await loginUser(
        { payload: { username: "unknownUser", password: "123456" } },
        h
      );

      expect(h.response).toHaveBeenCalledWith({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
      expect(h.code).toHaveBeenCalledWith(401);
    });

    it("should return error if password is incorrect", async () => {
      User.findOne.mockResolvedValue({
        id: 1,
        username: "testUser",
        password: "hashedPassword",
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        { payload: { username: "testUser", password: "wrongPassword" } },
        h
      );

      expect(h.response).toHaveBeenCalledWith({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
      expect(h.code).toHaveBeenCalledWith(401);
    });
  });

  describe("logoutUser", () => {
    it("should log out the user successfully", async () => {
      await logoutUser({}, h);

      expect(h.unstate).toHaveBeenCalledWith("token");
      expect(h.response).toHaveBeenCalledWith({
        success: true,
        message: "Logout successful",
        data: null,
      });
      expect(h.code).toHaveBeenCalledWith(200);
    });
  });

  describe("getUserDetails", () => {
    it("should return user details", async () => {
      const request = { user: { id: 1, username: "testUser" } };

      await getUserDetails(request, h);

      expect(h.response).toHaveBeenCalledWith({
        success: true,
        message: "You have accessed a protected route.",
        data: request.user,
      });
    });
  });
});
