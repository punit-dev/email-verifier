const verifyEmail = require("../src/verifyEmail");

jest.setTimeout(20000);

describe("Email Verification Module", () => {
  test("valid email format should pass syntax validation", async () => {
    const res = await verifyEmail("user@gmail.com");
    expect(res.email).toBe("user@gmail.com");
  });

  test("missing @ should return invalid", async () => {
    const res = await verifyEmail("usergmail.com");
    expect(res.result).toBe("invalid");
  });

  test("multiple @ should return invalid", async () => {
    const res = await verifyEmail("user@@gmail.com");
    expect(res.result).toBe("invalid");
  });

  test("empty string handled", async () => {
    const res = await verifyEmail("");
    expect(res.result).toBe("invalid");
  });

  test("null input handled", async () => {
    const res = await verifyEmail(null);
    expect(res.result).toBe("invalid");
  });

  test("undefined input handled", async () => {
    const res = await verifyEmail(undefined);
    expect(res.result).toBe("invalid");
  });

  test("detect gmial typo", async () => {
    const res = await verifyEmail("user@gmial.com");
    expect(res.subresult).toBe("typo_detected");
  });

  test("detect yahooo typo", async () => {
    const res = await verifyEmail("user@yahooo.com");
    expect(res.subresult).toBe("typo_detected");
  });

  test("detect hotmial typo", async () => {
    const res = await verifyEmail("user@hotmial.com");
    expect(res.subresult).toBe("typo_detected");
  });

  test("domain extraction works", async () => {
    const res = await verifyEmail("user@gmail.com");
    expect(res.domain).toBe("gmail.com");
  });

  test("result contains timestamp", async () => {
    const res = await verifyEmail("user@gmail.com");
    expect(res.timestamp).toBeDefined();
  });

  test("result contains executionTime", async () => {
    const res = await verifyEmail("user@gmail.com");

    expect(res.executiontime).toBeDefined();
  });

  test("result contains mxRecords array", async () => {
    const res = await verifyEmail("user@gmail.com");
    expect(Array.isArray(res.mxRecords)).toBe(true);
  });

  test("resultcode should exist", async () => {
    const res = await verifyEmail("user@gmail.com");
    expect(res.resultcode).toBeDefined();
  });

  test("error field exists in result", async () => {
    const res = await verifyEmail("user@gmail.com");
    expect(res).toHaveProperty("error");
  });

  test("long email handled", async () => {
    const longEmail = "verylongemailaddress1234567890@gmail.com";
    const res = await verifyEmail(longEmail);
    expect(res.email).toBe(longEmail);
  });
});
