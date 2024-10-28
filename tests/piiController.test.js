// __tests__/piiController.test.js

import { saveAadharNumber } from "../controllers/piiController.js";
import PII from "../models/piiModel.js";

jest.mock("../models/piiModel.js");

const mockRequest = (payload = {}, userId = null) => ({
  payload,
  user: {
    data: { id: userId },
  },
});

const mockResponse = () => {
  const res = {};
  res.code = jest.fn().mockReturnValue(res);
  res.response = jest.fn().mockReturnValue(res);
  return res;
};

describe("PII Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error for an invalid Aadhaar number", async () => {
    const request = mockRequest({ aadharNumber: "invalid_number" }, 1);
    const h = mockResponse();

    const response = await saveAadharNumber(request, h);

    expect(response.code).toHaveBeenCalledWith(400);
    expect(response.response).toHaveBeenCalledWith({
      success: false,
      message: "Aadhaar number must be a valid number.",
    });
  });
});
