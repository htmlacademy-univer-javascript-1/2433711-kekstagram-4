const checkLength = (checkedString, maxLength) =>
  checkedString.length < maxLength;

const isPalindrome = (checkedString) =>
  checkedString.toLowerCase().replaceAll(' ', '') ===
  checkedString.toLowerCase().replaceAll(' ', '').split('').reverse().join('');

const findDigit = (value) => {
  value.toString();
  const arr = [];
  for (let i = 0; i < value.length; i++) {
    const temp = parseInt(value[i], 10);
    if (!isNaN(temp)) {
      arr.push(temp);
    }
  }
  if (arr.length === 0) {
    return NaN;
  }
  return Number(arr.join(''));
};

const getRandomInt = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getUniqueInt = (min, max) => {
  const previouesValues = [];
  return function () {
    let randomNumber = getRandomInt(min, max);
    if (previouesValues.length >= max - min + 1) {
      return null;
    }
    while (previouesValues.includes(randomNumber)) {
      randomNumber = getRandomInt(min, max);
    }
    previouesValues.push(randomNumber);
    return randomNumber;
  };
};

export const generatePhotoId = getUniqueInt(1, 25);
export const generateCommentId = getUniqueInt(1, 1000000000000);
export const generateUrlId = getUniqueInt(1, 25);
