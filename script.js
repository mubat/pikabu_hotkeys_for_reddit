
function getPosts() {
  return document.getElementsByClassName('Post');
}

document.onkeydown = function(e) {
  let currentPosition = document.documentElement.scrollTop;
  switch(e.keyCode) {
    case 68: console.log('D pressed'); scrollOnElement(getPostByPosition(currentPosition)); break;
    case 87: console.log('W pressed'); votePost(getCurrentPost(currentPosition)); break;
    case 65: console.log('A pressed'); scrollOnElement(getPostByPosition(currentPosition, -1)); break;
    case 83: console.log('S pressed'); votePost(getCurrentPost(currentPosition), -1); break;
    case 69: console.log('E pressed'); openPost(getCurrentPost(currentPosition)); break;
    case 81: console.log('Q pressed'); if(window.getComputedStyle(getCloseButton()).display !== 'none') { closePost(); e.preventDefault(); } break; // TODO
  }
}

function getPostByPosition(position, direction = 1) {
  console.log('current position: ' + position);
  let postsList = getPosts();
  //
  for(let i=0; i < postsList.length; i++) {
    let positionToFound = postsList[i].offsetTop;
    console.log('Check ' + postsList[i].id + '. Offset: ' + postsList[i].offsetTop);
    if(direction == 1 ? positionToFound > position : positionToFound < position) {
      console.log('Found target. Offset' + positionToFound);
      console.log(postsList[i]);
      return postsList[i];
    } 
  }
}

function getCurrentPost(position) {
  let postsList = getPosts();
  for(let i=0; i < postsList.length; i++) {
    console.log('Check ' + postsList[i].id + '. Offset: ' + postsList[i].offsetTop);
    if(Math.abs(position - postsList[i].offsetTop - getDefaultOffsetScroll()) < 1) {
      console.log('Found current post . Offset' + position);
      console.log(postsList[i]);
      return postsList[i];
    } 
    
    if(i == 0 && postsList[i].offsetTop > position) { // if we at the top
       scrollOnElement(postsList[i]);
       return postsList[i];
    }
  }
}

function votePost(elem, voteStatus){
  elem.querySelector(voteStatus == -1 ? 'button[aria-label="downvote"]' : 'button[aria-label="upvote"]').click();
}

function scrollOnElement(elem, extra = 0) {
  window.scroll(0, elem.offsetTop + getDefaultOffsetScroll());
}

function openPost(postElement) {
  postElement.click();
}

function closePost() {
  getCloseButton().click();
}

function getCloseButton() {
  return document.querySelector('button[aria-label="Close"]');
}

function getDefaultOffsetScroll() {
  return  document.querySelector('header').scrollHeight -getPosts()[0].offsetTop + 1;
}