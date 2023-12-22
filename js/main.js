import { createSmallPicture } from './photos.js';
import './big-picture.js';
import './upload-form.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((photos) => {
    createSmallPicture(photos);
  })
  .catch((error) => {
    showAlert(error);
  });
