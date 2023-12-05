import { createPhotoPages } from './data.js';
import { showBigPicture } from './big-picture.js';
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const photoPages = createPhotoPages();
const pictureList = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const createSmallPicture = (url, description, likes, comments) => {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  showBigPicture(picture, url, description, likes, comments);
  picturesFragment.append(picture);
};

photoPages.forEach(({ url, description, likes, comments }) => {
  createSmallPicture(url, description, likes, comments);
});

pictureList.append(picturesFragment);
