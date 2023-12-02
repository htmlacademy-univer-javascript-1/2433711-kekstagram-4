const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture
  .querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCounter = bigPicture.querySelector('.comments-count');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');

const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

const closeElement = bigPicture.querySelector('#picture-cancel');
/*Закрытие окна*/
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
};

const startBodyMovement = () => {
  document.body.classList.remove('modal-open');
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  startBodyMovement();
  document.removeEventListener('keydown', onDocumentKeydown);
};

closeElement.addEventListener('click', () => {
  hideBigPicture();
});
/*Комментарии*/
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

const hideCommentCounter = () => {
  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');
};
/*Открытие окна*/
const stopBodyMovement = () => {
  document.body.classList.add('modal-open');
};

export const showBigPicture = (picture, url, description, likes, comments) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPictureDescription.textContent = description;
    bigPictureImage.src = url;
    bigPictureLikes.textContent = likes;
    bigPictureCommentsCounter.textContent = comments.length;
    insertComments(comments);
    hideCommentCounter();
    stopBodyMovement();
    document.addEventListener('keydown', onDocumentKeydown);
  });
};
