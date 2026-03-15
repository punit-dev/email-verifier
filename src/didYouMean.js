const { distance } = require("fastest-levenshtein");

const domains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];

const getDidYouMean = (email) => {
  const [username, domain] = email.split("@");

  for (const d of domains) {
    const dist = distance(domain, d);
    if (dist > 0 && dist <= 2) {
      return `${username}@${d}`;
    }
  }

  return null;
};

module.exports = getDidYouMean;
