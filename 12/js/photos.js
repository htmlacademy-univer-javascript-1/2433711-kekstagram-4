import { showBigPicture } from './big-picture.js';
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

export const createSmallPicture = (photoPages) => {
  photoPages.forEach((photo) => {
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

pictureList.append(picturesFragment);
