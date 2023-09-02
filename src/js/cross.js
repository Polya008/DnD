// TODO: write your code here
// появление крестика при наведении на задачу
const vidget = Array.from(document.getElementsByClassName('vidget'));
export default function addCross() {
  for (let i = 0; i < vidget.length; i += 1) {
    vidget[i].addEventListener('mouseover', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('task')) {
        e.target.querySelector('.cross').style.display = 'block';
      }
    });
    vidget[i].addEventListener('mouseleave', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('task')) {
        e.target.querySelector('.cross').style.display = 'none';
      }
    });
  }
}
