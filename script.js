const containers   = document.querySelectorAll('.content-container-inner');
const closeButtons = document.querySelectorAll('.content-container-inner > .btn-close');


/* =============================================================================

============================================================================= */


function getPosition(element){
  const rect = element.getBoundingClientRect();
  const top  = rect.top;
  const left = rect.left;
  return { top, left };
}


/* =============================================================================

============================================================================= */


function fixInPlace(element, position){
  element.style.position = 'fixed';
  element.style.top      = position.top  + 'px';
  element.style.left     = position.left + 'px';
}


function unfixInPlace(element){
  element.style.position = '';
  element.style.top      = '';
  element.style.left     = '';
}


/* =============================================================================

============================================================================= */


function transformToTopLeft(container, position){
  if (position.top > 0){
     container.style.transform = `translate(-${position.left}px, -${position.top}px)`;
  } else if (position.top < 0){
    container.style.transform = `translate(-${position.left}px, ${position.top * -1}px)`;
  }
}


function transformFromTopLeft(container){
  container.style.transform = '';
}


/* =============================================================================

============================================================================= */


function expand(container){
  container.style.width        = '100%';
  container.style.height       = '100%';
  container.style.overflow     = 'scroll'
  container.style.outline      = '1px solid #333';
  container.style.zIndex       = '10000'; //This might not be enough to cover all Bootstrap z indexes.

  document.body.style.overflow = 'hidden';
}


function contract(container){
  container.style.width        = '';
  container.style.height       = '';
  container.style.overflow     = '';
  setTimeout(function(){ container.style.outline = ''; }, 200);
  setTimeout(function(){ container.style.zIndex = ''; }, 260);

  document.body.style.overflow = '';
}


/* =============================================================================

============================================================================= */


//You may need these for more sophisticated transitions.
// function showContent(container){
// }
//
//
// function hideContent(container){
// }


/* =============================================================================

============================================================================= */


function openContainer(){
  if (this.hasAttribute('data-open')){ return; }
  const position = getPosition(this);
  this.setAttribute("data-open", "");
  this.style.transition = 'all 0.25s linear';
  fixInPlace(this, position);
  transformToTopLeft(this, position);
  expand(this);
  //showContent(this);
}


function closeContainer(e){
  e.stopPropagation();
  const container = this.parentElement;
  contract(container);
  transformFromTopLeft(container);

  setTimeout(function(){
    unfixInPlace(container);
    container.style.transition = '';
  }, 300);
  container.removeAttribute('data-open');
  //hideContent(container);
}


/* =============================================================================

============================================================================= */


containers.forEach(container     => container.addEventListener('click', openContainer));
closeButtons.forEach(closeButton => closeButton.addEventListener('click', closeContainer));
