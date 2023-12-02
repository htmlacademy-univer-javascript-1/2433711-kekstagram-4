const bigPictureCommentList = document.querySelector('.social__comments');

const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
let commentsList;
let displayedComments = 0;

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

const sliceComments = (comments) => {
  commentsList = comments;
  console.log(commentsList);
  let slisedComments = comments.slice(displayedComments, displayedComments + 5);
  console.log(displayedComments);
  if (commentsList.length === displayedComments) {
    displayedComments = 0;
  }
  insertComments(slisedComments);
};

commentLoader.addEventListener('click', () => {
  displayedComments =
    displayedComments + 5 > commentsList.length
      ? commentsList.length
      : displayedComments + 5;
  sliceComments(commentsList);
});
const countCommentsToDisplay = () => {};
