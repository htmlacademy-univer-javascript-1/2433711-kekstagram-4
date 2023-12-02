export const getRandomInt = (min, max) => {
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
