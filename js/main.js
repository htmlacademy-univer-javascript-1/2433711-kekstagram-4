import { createMiniatures } from './users-photo-miniatures.js';
import './fullscreen-photo-modal.js';
import './new-photo-upload/upload-photo-form.js';
import './new-photo-upload/effects-no-UI-slider.js';
import { getData } from './api.js';
import { showAlert, debounce } from './utils.js';
import {
  setDiscussedFilter,
  sortByCommentsAmount,
  setDefaultFilter,
  setRandomFilter,
  defaultSort,
  randomizePhotos,
} from './filters.js';

getData()
  .then((photos) => {
    createMiniatures(photos);
    setDiscussedFilter(
      debounce(() => createMiniatures(photos, sortByCommentsAmount))
    );
    setRandomFilter(debounce(() => createMiniatures(photos, randomizePhotos)));
    setDefaultFilter(debounce(() => createMiniatures(photos, defaultSort)));
    document
      .querySelector('.img-filters')
      .classList.remove('img-filters--inactive');
  })
  .catch((error) => {
    showAlert(error);
  });
