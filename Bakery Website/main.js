const navlist = document.getElementById('navlist');
const hamburger = document.getElementById('hamburger');

if (hamburger && navlist) {
    hamburger.addEventListener('click', () => {
        navlist.classList.toggle('navlist-active');
    });
}