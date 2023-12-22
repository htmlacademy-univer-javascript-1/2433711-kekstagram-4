const ALERT_SHOW_TIME = 5000;

export const getRandomInt = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

export const stopBodyMovement = () => {
  document.body.classList.add('modal-open');
};
export const startBodyMovement = () => {
  document.body.classList.remove('modal-open');
};

export const getUniqueInt = (min, max) => {
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
export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
export function debounce(callback, timeoutDelay = 1000) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export const generatePhotoId = getUniqueInt(1, 25);
export const generateCommentId = getUniqueInt(1, 1000000000000);
export const generateUrlId = getUniqueInt(1, 25);
