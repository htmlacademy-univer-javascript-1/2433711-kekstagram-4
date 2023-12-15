const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageUploadPrewiew = document.querySelector('img.img-upload__preview');

const calculateScaleValue = (changeValue) => {
  const currentValue = Number(scaleValue.value.slice(0, -1));
  scaleValue.value = `${currentValue + changeValue}%`;
  imageUploadPrewiew.style.transform = `scale(${
    Number(scaleValue.value.slice(0, -1)) / 100
  })`;
};
const downScaleValue = () => {
  if (scaleValue.value !== '25%') {
    calculateScaleValue(-25);
  }
};
const upScaleValue = () => {
  if (scaleValue.value !== '100%') {
    calculateScaleValue(25);
  }
};

export const withUploadOpening = () => {
  scaleSmaller.addEventListener('click', downScaleValue);
  scaleBigger.addEventListener('click', upScaleValue);
};
export const withUploadClosing = () => {
  scaleSmaller.removeEventListener('click', downScaleValue);
  scaleBigger.removeEventListener('click', upScaleValue);
  imageUploadPrewiew.style.transform = 'scale(1)';
};
