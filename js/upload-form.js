import { startBodyMovement, stopBodyMovement } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const imageEditor = document.querySelector('.img-upload__overlay');
const imageEditorPreview = document.querySelector('img.img-upload__preview');
const editorCloser = document.querySelector('.img-upload__cancel');
const pristine = new Pristine(uploadForm, {
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
const descriptionInput = document.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideEditor();
  }
};

const hideEditor = () => {
  if (
    hashtagInput !== document.activeElement &&
    descriptionInput !== document.activeElement
  ) {
    imageEditor.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    editorCloser.removeEventListener('click', hideEditor);
    startBodyMovement();
    uploadForm.reset();
  }
};
fileInput.addEventListener('change', () => {
  imageEditor.classList.remove('hidden');
  imageEditorPreview.src = URL.createObjectURL(fileInput.files[0]);
  stopBodyMovement();
  document.addEventListener('keydown', onDocumentKeydown);
  editorCloser.addEventListener('click', hideEditor);
});

const isHashtagValid = () => {
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
      hashtagErrorMessage = 'Превышено количество хэш-тегов';
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
  isHashtagValid,
  createErrorMessage,
  1,
  false
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});
