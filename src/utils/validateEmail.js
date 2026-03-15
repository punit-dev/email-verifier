const validateEmail = (email) => {
  regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = validateEmail;
