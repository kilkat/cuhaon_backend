const validator = require('validator');

const joinValidator = (errors, values) => {
  const { email, nickname, password, cfm_password } = values;

  if (!validator.isEmail(email)) {
    errors['email'] = '유효하지 않은 email입니다.';
  }

  if (validator.isEmpty(nickname)) {
    errors['nickname'] = '빈 문자열을 제출할 수 없습니다.';
  }

  if (validator.isEmpty(password)) {
    errors['password'] = '빈 문자열을 제출할 수 없습니다.';
  }

  if (validator.isEmpty(cfm_password)) {
    errors['cfm_password'] = '빈 문자열을 제출할 수 없습니다.';
  }
};

// const postSaveValidator;

const commentSaveValidator = (error, values) => {
  const { content } = values;

  if (validator.isEmpty(content)) {
    errors['content'] = '유효하지 않은 댓글입니다.';
  }
};

module.exports = {
  joinValidator,
  commentSaveValidator,
};
