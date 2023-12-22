import { createMiniatures } from './miniatures.js';
import './big-picture.js';
import './upload-form.js';
import './effects.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
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
  })
  .then(
    document
      .querySelector('.img-filters')
      .classList.remove('img-filters--inactive')
  )
  .catch((error) => {
    showAlert(error);
  });
