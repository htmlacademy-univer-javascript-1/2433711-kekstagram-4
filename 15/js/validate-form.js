const uploadForm = document.querySelector('.img-upload__form');
export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'hasgtag__error',
});

const hashtagInput = document.querySelector('.text__hashtags');
const hashtagTemplate = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
let hashtagErrorMessage;

const isHashtagsValid = () => {
  const hashtagCounter = hashtagInput.value
    .split(' ')
    .map((hashtag) => hashtag.toLowerCase());
  for (let hashtag of hashtagCounter) {
    hashtag = hashtag.toLowerCase();
    if (
      hashtag.split('#').length > 2 ||
      (!hashtagTemplate.test(hashtag) && hashtag !== '')
    ) {
      hashtagErrorMessage = 'Введён невалидный хэш-тег';
      return false;
    } else if (hashtagCounter.length > MAX_HASHTAGS) {
      hashtagErrorMessage = 'Превышено максимальное количество хештегов(5)';
      return false;
    }
  }
  if (new Set(hashtagCounter).size !== hashtagCounter.length) {
    hashtagErrorMessage = 'Хэш-теги повторяются.';
    return false;
  }
  return true;
};
const createErrorMessage = () => hashtagErrorMessage;
pristine.addValidator(
  hashtagInput,
  isHashtagsValid,
  createErrorMessage,
  1,
  false
);
