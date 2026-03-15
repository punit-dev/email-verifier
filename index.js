const verifyEmail = require("./src/verifyEmail");

const run = async (email) => {
  const result = await verifyEmail(email);
  console.log(result);
};

const email = process.argv[2];

run(email);
