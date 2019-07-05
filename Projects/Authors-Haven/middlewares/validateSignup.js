import ValidateUser from '../helpers/validate';

// Validate all user signup input
const validateSignup = (req, res, next) => {
  const { email, username, password } = req.body.user;
  const body = [];
  const checkEmail = ValidateUser.validateEmail(email);
  const checkPassword = ValidateUser.validatePassword(password);
  const checkUsername = ValidateUser.validateUsername(username);

  if (checkEmail.error) {
    body.push({
      emailError: checkEmail.error
    });
  }

  if (checkUsername.error) {
    body.push({
      usernameError: checkUsername.error
    });
  }

  if (checkPassword.error) {
    body.push({
      passwordError: checkPassword.error
    });
  }

  if (body.length > 0) {
    return res.status(400).send({
      errors: { body }
    });
  }

  next();
};

export default validateSignup;
