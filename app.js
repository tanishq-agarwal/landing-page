*/Declaring global variables*/
const sections = Array.from(document.getElementsByTagName('section'));
const title = document.getElementById('title');
const navbarList = document.getElementById('nb_list');

/**
 * Scroll to the body by Jquery
 * click to focus on the body
 */
function scrollTo(target) {
  $('html,body').animate({
    scrollTop: target ? target.offset().top : 0
  }, 'slow');
}

/**
 * Function call on the each click 
 * Fuction call after the action
 */
function focusOnScroll() {
  sections.forEach(section => section.classList.remove('active-section'));
  if (isElementInViewport(title)) {
    navbarList.childNodes[0].classList.add('navbar-active');
    navbarList.childNodes.forEach((navLink, index) =>
      index && navLink.classList.remove('navbar-active'));
  } else {
    const activeIndex = sections.findIndex(section => isElementInViewport(section.childNodes[1].childNodes[1]));
    const activeSection = sections[activeIndex];
    const activeLink = navbarList.childNodes[activeIndex + 1];
    activeSection && activeSection.classList.add('active-section');
    activeLink && activeLink.classList.add('navbar-active');
    navbarList.childNodes.forEach((navLink, index) =>
      index !== (activeIndex + 1) && navLink.classList.remove('navbar-active'));
  }
}

window.onscroll = focusOnScroll;


/**
 * Function to render navbar
 * using onclick
 */
function renderNavbar() {
  const homeLink = document.createElement('li');
  homeLink.innerText = 'Home';
  homeLink.className = 'menu__link';
  homeLink.onclick = () => scrollTo();
  navbarList.appendChild(homeLink);
  sections.forEach(section => {
    if (!section.dataset || !section.dataset.nav) return;
    const item = document.createElement('li');
    item.innerText = section.dataset.nav;
    item.className = 'menu__link';
    item.onclick = () => scrollTo($(`#${section.id}`));
    navbarList.appendChild(item);
  });
}

renderNavbar();
focusOnScroll();
/**
 * Checks the element is inside or outside the view port
 * Enter to the scroll body
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}