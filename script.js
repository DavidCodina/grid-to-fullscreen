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
  container.style.height = '100%';

  if (position.top > 0){
     container.style.transform = `translate(-${position.left}px, -${position.top}px) scale(1)`;
  } else if (position.top < 0){
    container.style.transform = `translate(-${position.left}px, ${position.top * -1}px) scale(1)`;
  }
}


function transformFromTopLeft(container){
  container.style.height    = '100vw';
  container.style.transform = `translate(0,0) scale(0.333)`;
}


/* =============================================================================

============================================================================= */


function preOpen(container){
  container.setAttribute("data-open", "");
  container.style.width           = '100%';
  container.style.height          = '100vw';
  container.style.outline         = '2px solid #333';
  container.style.transformOrigin = 'top left';
  container.style.transform       = 'scale(0.333)';
  container.style.zIndex          = '10000';
  document.body.style.overflow    = 'hidden';
}


function postClose(container){
  container.style.transition      = '';
  container.style.width           = '';
  container.style.height          = '';
  container.style.zIndex          = '';
  container.style.outline         = '';
  container.style.transform       = '';
  container.style.transformOrigin = '';
  document.body.style.overflow    = '';
  container.removeAttribute('data-open');
}


/* =============================================================================

============================================================================= */


function openContainer(){
  if (this.hasAttribute('data-open')){ return; }
  const position = getPosition(this);
  fixInPlace(this, position);
  preOpen(this);
  //Force reflow: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  setTimeout(function(){
    this.style.transition = 'all 0.5s ease-in-out'; //Can this go in transformToTopLeft ???
    transformToTopLeft(this, position);
  }.bind(this), 0);
}


function closeContainer(e){
  e.stopPropagation();
  const container = this.parentElement;
  transformFromTopLeft(container);

  setTimeout(function(){
    postClose(container);
    unfixInPlace(container);
  }, 500);
}


/* =============================================================================

============================================================================= */


containers.forEach(container     => container.addEventListener('click', openContainer));
closeButtons.forEach(closeButton => closeButton.addEventListener('click', closeContainer));
