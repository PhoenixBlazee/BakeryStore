const navlist = document.getElementById('navlist');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    navlist.classList.toggle('navlist-active');
});