import { showBigPicture } from './fullscreen-photo-modal.js';
import { defaultSort } from './filters.js';
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

export const createMiniatures = (photoPages, cb = defaultSort) => {
  const pictureElements = pictureList.querySelectorAll('.picture');
  pictureElements.forEach((pictureElement) => {
    pictureElement.remove();
  });
  const picturesFragment = document.createDocumentFragment();
  photoPages
    .slice()
    .sort(cb)
    .forEach((photo) => {
      const picture = template.cloneNode(true);
      picture.querySelector('.picture__img').src = photo.url;
      picture.querySelector('.picture__img').alt = photo.description;
      picture.querySelector('.picture__comments').textContent =
        photo.comments.length;
      picture.querySelector('.picture__likes').textContent = photo.likes;
      showBigPicture(
        picture,
        photo.url,
        photo.description,
        photo.likes,
        photo.comments
      );
      picturesFragment.append(picture);
    });
  pictureList.append(picturesFragment);
};
