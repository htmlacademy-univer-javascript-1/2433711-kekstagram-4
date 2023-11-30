import {
  generateCommentId,
  generatePhotoId,
  generateUrlId,
  getRandomInt,
} from './util.js';
const DESCRIPTIONS = [
  'Make it happen (‘Сделай это’)',
  'Morning coffee, because anything else is worthless (‘Утренний кофе, потому что все остальное бесполезно’).',
  'FRI-nally (‘Наконец-то, пятница’).',
  'Good vibes only (‘Только позитивное настроение’).',
  'Follow your heart (‘Следуй за своим сердцем’).',
  ' Aspire to inspire (‘Стремись вдохновлять’).',
  'Yes or No? (‘Да или нет?’).',
  ' Never look back (‘ Никогда не смотри назад’).',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Антон',
  'Евгений',
  'Пётр',
  'Саня',
  'Гриша',
  'Арсений',
  'Кабанчик',
];
const PHOTO_COUNT = 25;

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
  name: NAMES[(0, getRandomInt(0, NAMES.length - 1))],
});
const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(15, 200),
  comments: Array.from({ length: getRandomInt(0, 30) }, createComment),
});
const createPhotoPages = () => Array.from({ length: PHOTO_COUNT }, createPhoto);
export { createPhotoPages };
