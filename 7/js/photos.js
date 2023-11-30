import { createPhotoPages } from './data.js';
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const photoPages = createPhotoPages();
photoPages.forEach(({ url, description, likes, comments }) => {
  const picture = template.cloneNode(true);
  const pictureList = document.querySelector('.pictures');
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  console.log(picture);
  pictureList.append(picture);
});
