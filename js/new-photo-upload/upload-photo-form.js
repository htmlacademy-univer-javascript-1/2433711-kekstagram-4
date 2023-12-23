import {
  startBodyMovement,
  stopBodyMovement,
  isEscapeButton,
} from '../utils.js';
import { pristine } from './validate-photo-hashtags-and-description.js';
import {
  withUploadOpening,
  withUploadClosing,
} from './upload-photo-scale-control.js';
import { hideSlider } from './effects-no-UI-slider.js';
import { sendData } from '../api.js';
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const imageModal = document.querySelector('.img-upload__overlay');
const effectsPrewiew = document.querySelectorAll('.effects__preview_img');
const imageModalPreview = document.querySelector('img.img-upload__preview');
const editorCloser = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('.img-upload__submit');
const descriptionInput = document.querySelector('.text__description');
const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
document.body.append(successMessage);
document.body.append(errorMessage);
let currentMessage;
let currentButton;

const changeEffectsImg = (src) => {
  effectsPrewiew.forEach((prewiew) => {
    prewiew.src = src;
    prewiew.style.width = '72px';
    prewiew.style.height = '72px';
  });
};
/**/
const hideModal = () => {
  if (
    hashtagInput !== document.activeElement &&
    descriptionInput !== document.activeElement
  ) {
    imageModal.classList.add('hidden');
    if (successMessage.classList.contains('hidden')) {
      document.removeEventListener('keydown', onDocumentKeydown);
    }
    editorCloser.removeEventListener('click', hideModal);
    uploadForm.removeEventListener('submit', formSumbitHandler);
    startBodyMovement();
    withUploadClosing();
    hideSlider();
    uploadForm.reset();
  }
};
const closeMessage = () => {
  currentMessage.classList.add('hidden');
  currentButton.removeEventListener('click', closeMessage);

  document.removeEventListener('click', isClickOutsideWindow);
  if (imageModal.classList.contains('hidden')) {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeButton(evt)) {
    evt.preventDefault();
    if (
      currentMessage !== undefined &&
      !currentMessage.classList.contains('hidden')
    ) {
      closeMessage();
    } else {
      hideModal();
    }
  }
}

function isClickOutsideWindow(evt) {
  if (evt.target === currentMessage) {
    closeMessage();
  }
}
const showMessage = () => {
  currentButton.addEventListener('click', closeMessage);
  document.addEventListener('click', isClickOutsideWindow);
  currentMessage.classList.remove('hidden');
};
const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', '');
  submitButton.value = 'Публикую';
};

const unlockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.value = 'Опубликовать';
};
const formSumbitHandler = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        currentMessage = successMessage;
        currentButton = successButton;
        showMessage();
        hideModal();
      })
      .catch(() => {
        currentMessage = errorMessage;
        currentButton = errorButton;
        showMessage();
      })
      .finally(unlockSubmitButton);
  }
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imageModal.classList.remove('hidden');
    const url = URL.createObjectURL(fileInput.files[0]);
    imageModalPreview.src = url;
    changeEffectsImg(url);
    stopBodyMovement();
    document.addEventListener('keydown', onDocumentKeydown);
    editorCloser.addEventListener('click', hideModal);
    uploadForm.addEventListener('submit', formSumbitHandler);
    withUploadOpening();
  }
});
