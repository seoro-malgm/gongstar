//email
export const validateEmailHelper = email => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!email.match(regExp)) {
    return false;
  } else {
    return true;
  }
};

//영문 대소문자
export const validateEngHelper = text => {
  const regExp = /(?=.*?[a-z])(?=.*?[A-Z])/;
  if (!text.match(regExp)) {
    return false;
  } else {
    return true;
  }
};

//숫자
export const validateNumHelper = text => {
  const regExp = /[0-9]/g;
  if (!text.match(regExp)) {
    return false;
  } else {
    return true;
  }
};

//phone
export const validatePhoneHelper = phone => {
  const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  if (!phone.match(regExp)) {
    return false;
  } else {
    return true;
  }
};

export const getTime = time => {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
};

export const toLocaleFormat = ({text = '', fixed = 1, minFixed, maxFixed}) => {
  if (!text || text === '') {
    return '0';
  }
  const str = text + '';
  const result = Number(str.split(',').join('')).toLocaleString(undefined, {
    minimumFractionDigits: minFixed,
    // 소수점이 없는 표현을 할수가 없다 fixed가 언제나 들어가면 - 2022-11-29.ljh
    //minimumFractionDigits: minFixed || fixed,
    maximumFractionDigits: maxFixed || fixed,
  });
  if (result === NaN) {
    return '-';
  } else {
    return result;
  }
};

export const getPercentNumber = (text = '', percent = 1) => {
  if (!text || text === '') {
    return '0';
  }
  const str = text + '';
  const toNumbered = Number(str.split(',').join(''));
  const result = toLocaleFormat({text: `${toNumbered * percent}`, fixed: 0});
  if (result === NaN) {
    return '-';
  } else {
    return result;
  }
};

// match해야할 패턴 string을 리턴함
export const fuzzyMatcher = text => {
  if (!text || text === '') return [];
  text.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

  // 영문이 포함된경우 영문으로 검색
  const enRegex = new RegExp(/^[A-Za-z]+$/);
  // 영문인경우
  if (enRegex.test(text)) {
    const pattern = text.toUpperCase();
    return pattern;
  }
  // 한국어로 테스트
  const koRegex = new RegExp(/^[ㄱ-힣]+$/);
  if (koRegex.test(text)) {
    let res = '', // 초성으로 변환
      choArr = [
        'ㄱ',
        'ㄲ',
        'ㄴ',
        'ㄷ',
        'ㄸ',
        'ㄹ',
        'ㅁ',
        'ㅂ',
        'ㅃ',
        'ㅅ',
        'ㅆ',
        'ㅇ',
        'ㅈ',
        'ㅉ',
        'ㅊ',
        'ㅋ',
        'ㅌ',
        'ㅍ',
        'ㅎ',
      ];
    for (let i in text) {
      const code = Math.floor((text[i].charCodeAt() - 44032) / 588);
      res += code >= 0 ? choArr[code] : text[i];
    }

    return res;
  }

  // 그외엔 text 그대로 return
  return text;
};
