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

const saveWargameValidator = (errors, values) => {
  const { title, content, type, level, point, flag } = values;

  if (typeof title == 'undefined') {
    errors['title'] = 'title을 작성해주세요.';
  }

  if (validator.isEmpty(content)) {
    errors['content'] = 'content을 작성해주세요.';
  }

  console.log(type);

  if (typeof type == 'undefined') {
    errors['type'] = 'type체크는 필수입니다.';
  }

  if (typeof level == 'undefined') {
    errors['level'] = 'level체크는 필수입니다.';
  }

  if (
    typeof type != 'undefined' &&
    !validator.isIn(type, [
      'all',
      'system',
      'reversing',
      'web',
      'cipher',
      'forensic',
      'misc',
    ])
  ) {
    errors['type'] = '보기에 없는 type입니다.';
  }

  if (
    typeof level != 'undefined' &&
    !validator.isIn(level, ['level1', 'level2', 'level3', 'level4', 'level5'])
  ) {
    errors['level'] = '보기에 없는 level입니다.';
  }

  if (validator.isEmpty(point)) {
    errors['point'] = 'point를 작성해주세요.';
  }

  if (validator.isEmpty(flag)) {
    errors['flag'] = 'flag를 작성해주세요.';
  }
};

const commentSaveValidator = (errors, values) => {
  const { content } = values;

  if (validator.isEmpty(content)) {
    errors['content'] = '내용을 작성해주세요.';
  }
};

module.exports = {
  joinValidator,
  saveWargameValidator,
  commentSaveValidator,
};
