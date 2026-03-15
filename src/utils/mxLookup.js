const dns = require("dns").promises;

const getMxLookup = async (domain) => {
  const records = await dns.resolveMx(domain);
  return records.map((r) => r.exchange);
};

module.exports = getMxLookup;
