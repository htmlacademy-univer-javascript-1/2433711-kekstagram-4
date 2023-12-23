import { getRandomInt } from './utils.js';
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

export const sortByCommentsAmount = (photoA, photoB) => {
  const commentsCountB = photoB.comments.length;
  const commentsCountA = photoA.comments.length;
  return commentsCountB - commentsCountA;
};
export const randomizePhotos = (photoA, photoB) => {
  const photoARandomValue = getRandomInt(0, 100);
  const photoBRandomValue = getRandomInt(0, 100);
  return photoBRandomValue - photoARandomValue;
};
export const defaultSort = (photoA, photoB) => 0;

export const setDiscussedFilter = (cb) => {
  discussedFilter.addEventListener('click', () => {
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
    cb();
  });
};
export const setDefaultFilter = (cb) => {
  defaultFilter.addEventListener('click', () => {
    randomFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    cb();
  });
};
export const setRandomFilter = (cb) => {
  randomFilter.addEventListener('click', () => {
    randomFilter.classList.add('img-filters__button--active');
    defaultFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    cb();
  });
};
