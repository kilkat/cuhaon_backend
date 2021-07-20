const validator = require('validator');

const joinValidator = (errors, values) => {
  const { email, nickname, password, cfm_password } = values;

  if (!validator.isEmail(email)) {
    errors['email'] = '유효하지 않은 email입니다.';
  }

  if (!validator.isEmpty(nickname)) {
    errors['nickname'] = '유효하지 않은 nickname입니다.';
  }

  if (!validator.isEmpty(password)) {
    errors['password'] = '유효하지 않은 password입니다.';
  }

  if (!validator.isEmpty(cfm_password)) {
    errors['cfm_password'] = '유효하지 않은 cfm_password입니다.';
  }
};

// const postSaveValidator;
// const postUpdateValidator;
// const commentSaveValidator;
// const commentUpdateValidator;

module.exports = {
  joinValidator,
};
