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
