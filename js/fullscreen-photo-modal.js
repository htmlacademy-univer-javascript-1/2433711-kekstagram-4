import {
  stopBodyMovement,
  startBodyMovement,
  isEscapeButton,
} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture
  .querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCounter = bigPicture.querySelector('.comments-count');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
let displayedComments = 0;
let previousDisplayedComments = 0;
const closeElement = bigPicture.querySelector('#picture-cancel');
let commentsList;
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentsShowedElement = bigPicture.querySelector('.comments-showed-now');
/*Закрытие окна*/

const hideModal = () => {
  bigPicture.classList.add('hidden');
  startBodyMovement();
  bigPictureCommentList.innerHTML = '';
  displayedComments = 0;
  previousDisplayedComments = 0;
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeElement.removeEventListener('click', hideModal);
  commentLoader.removeEventListener('click', loadComments);
};

function onDocumentKeydown(evt) {
  if (isEscapeButton(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

const insertComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  for (const comment of comments) {
    const bigPictureComment = document
      .querySelector('#comment')
      .content.querySelector('.social__comment')
      .cloneNode(true);
    const commentAvatar = bigPictureComment.querySelector('img');
    const commentParagraph = bigPictureComment.querySelector('p');
    commentParagraph.textContent = comment.message;
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentsFragment.append(bigPictureComment);
  }
  bigPictureCommentList.append(commentsFragment);
};
const countDisplayedComments = () => {
  if (displayedComments + 5 >= commentsList.length) {
    commentLoader.classList.add('hidden');
    commentsShowedElement.textContent = commentsList.length;
    return commentsList.length;
  }
  return displayedComments + 5;
};
const sliceComments = (comments) => {
  const slisedComments = comments.slice(
    displayedComments - (displayedComments - previousDisplayedComments) > 0
      ? displayedComments - (displayedComments - previousDisplayedComments)
      : 0,
    displayedComments
  );
  insertComments(slisedComments);
};

const loadComments = () => {
  previousDisplayedComments = displayedComments;
  displayedComments = countDisplayedComments();
  commentsShowedElement.textContent = displayedComments;
  sliceComments(commentsList);
};
export const showBigPicture = (picture, url, description, likes, comments) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPictureDescription.textContent = description;
    bigPictureImage.src = url;
    bigPictureLikes.textContent = likes;
    bigPictureCommentsCounter.textContent = comments.length;
    stopBodyMovement();
    commentsList = comments;
    displayedComments = countDisplayedComments();
    commentsShowedElement.textContent = displayedComments;
    sliceComments(comments);
    commentLoader.addEventListener('click', loadComments);
    document.addEventListener('keydown', onDocumentKeydown);
    closeElement.addEventListener('click', hideModal);
  });
};
