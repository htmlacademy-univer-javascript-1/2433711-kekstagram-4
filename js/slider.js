const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const imageModalPreview = document.querySelector('img.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let selectedEffect = 'none';
const filters = {
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale', measurment: '' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia', measurment: '' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', measurment: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', measurment: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness', measurment: '' },
};
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  step: 5,
  start: 50,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
const effects = document.querySelectorAll('input.effects__radio ');
const addListenersOnEffect = (effect) => {
  effect.addEventListener('change', () => {
    selectedEffect = effect.value;
    if (effect.value !== 'none') {
      sliderContainer.classList.remove('hidden');
      console.log(
        `filter:${filters[effect.value]['filter']}(${
          filters[effect.value]['max']
        }${filters[effect.value]['measurment']})`
      );
      imageModalPreview.style = `filter: ${filters[effect.value]['filter']}(${
        filters[effect.value]['max']
      }${filters[effect.value]['measurment']}
      )`;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: filters[effect.value]['min'],
          max: filters[effect.value]['max'],
        },
        step: filters[effect.value]['step'],
        start: filters[effect.value]['max'],
        connect: 'lower',
      });
    } else {
      sliderContainer.classList.add('hidden');
      imageModalPreview.removeAttribute('style');
    }
  });
};

sliderElement.noUiSlider.on('update', () => {
  // Получите текущее значение слайдера
  const value = sliderElement.noUiSlider.get();

  if (imageModalPreview.getAttribute('style') !== null) {
    imageModalPreview.style = `${
      imageModalPreview.getAttribute('style').split('(')[0]
    }(${value}${filters[selectedEffect]['measurment']})`;
    // Обновите CSS-стили изображения в зависимости от выбранного эффект
    // Обновите значение поля .effect-level__value
  }
  effectLevelValue.value = value;
});
for (const effect of effects) {
  addListenersOnEffect(effect);
}
export const deleteSlider = () => {
  sliderElement.noUiSlider.destroy();
};
/*noUiSlider.create(effectLevelValue,*/
