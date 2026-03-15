const validateEmail = require("./utils/validateEmail");
const getMxLookup = require("./utils/mxLookup");
const getDidYouMean = require("./didYouMean");
const checkMailbox = require("./smtpCheck");

const resCodeObj = {
  valid: 1,
  unknown: 3,
  invalid: 6,
};

const verifyEmail = async (email) => {
  const start = Date.now();

  if (!validateEmail(email)) {
    return {
      email,
      result: "invalid",
      subresult: "invalid_format",
    };
  }

  const domain = email.split("@")[1];

  const suggestion = getDidYouMean(email);
  if (suggestion) {
    return {
      email,
      didYouMean: suggestion,
      result: "invalid",
      resultcode: 6,
      subresult: "typo_detected",
      domain,
      mxRecords: [],
      executiontime: (Date.now() - start) / 1000,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const mx = await getMxLookup(domain);
    if (!mx.length) {
      return {
        email,
        result: "invalid",
        resultcode: 6,
        subresult: "no_mx_records",
        domain,
        executionTime: (Date.now() - start) / 1000,
        error: null,
        timestamp: new Date().toISOString(),
      };
    }

    const smtp = await checkMailbox(email, mx[0]);

    return {
      email,
      result: smtp.result,
      resultcode: resCodeObj[smtp.result],
      subresult: smtp.subresult,
      domain,
      mxRecords: mx,
      executiontime: (Date.now() - start) / 1000,
      error: null,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return {
      email,
      result: "unknown",
      resultcode: 3,
      subresult: "connection_error",
      domain,
      mxRecords: [],
      executiontime: (Date.now() - start) / 1000,
      error: err.message,
      timestamp: new Date().toISOString(),
    };
  }
};

module.exports = verifyEmail;
