import { startBodyMovement, stopBodyMovement } from './util.js';
import { pristine } from './validate-form.js';
import { withUploadOpening, withUploadClosing } from './scale-control.js';
import { deleteSlider } from './slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const imageModal = document.querySelector('.img-upload__overlay');
const imageModalPreview = document.querySelector('img.img-upload__preview');
const editorCloser = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');

const descriptionInput = document.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideModal();
  }
};

const hideModal = () => {
  if (
    hashtagInput !== document.activeElement &&
    descriptionInput !== document.activeElement
  ) {
    imageModal.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    editorCloser.removeEventListener('click', hideModal);
    startBodyMovement();
    withUploadClosing();
    deleteSlider();
    uploadForm.reset();
  }
};
fileInput.addEventListener('change', () => {
  imageModal.classList.remove('hidden');
  imageModalPreview.src = URL.createObjectURL(fileInput.files[0]);
  stopBodyMovement();
  document.addEventListener('keydown', onDocumentKeydown);
  editorCloser.addEventListener('click', hideModal);
  withUploadOpening();
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});
