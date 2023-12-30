const checkBody = function (body, values) {
  let validInput = true;

  for (const field of values) {
    if (!body[field] || body[field] === "") {
      validInput = false;
    }
  }
  return validInput;
};

module.exports = { checkBody };
