import { startBodyMovement, stopBodyMovement } from './util.js';
import { pristine } from './validate-form.js';
import { withUploadOpening, withUploadClosing } from './scale-control.js';
import { hideSlider } from './slider.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const imageModal = document.querySelector('.img-upload__overlay');
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
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
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
};

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
const isClickOutsideWindow = (evt) => {
  if (evt.target === currentMessage) {
    closeMessage();
  }
};
const showMessage = () => {
  currentButton.addEventListener('click', closeMessage);
  document.addEventListener('click', isClickOutsideWindow);
  currentMessage.classList.remove('hidden');
};

fileInput.addEventListener('change', () => {
  imageModal.classList.remove('hidden');
  imageModalPreview.src = URL.createObjectURL(fileInput.files[0]);
  stopBodyMovement();
  document.addEventListener('keydown', onDocumentKeydown);
  editorCloser.addEventListener('click', hideModal);
  withUploadOpening();
});
const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', '');
  submitButton.value = 'Публикую';
};
const unlockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.value = 'Опубликовать';
};
uploadForm.addEventListener('submit', (evt) => {
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
});
