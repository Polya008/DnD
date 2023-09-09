// TODO: write your code here

const btnAdd = Array.from(document.querySelectorAll('.add'));
const modal = document.querySelectorAll('.window_modal');
const closeBtn = Array.from(document.querySelectorAll('.close_task'));
export default function Modal() {
  // открываем окно с добавлением задачи
  for (let i = 0; i < btnAdd.length; i += 1) {
    btnAdd[i].addEventListener('click', (e) => {
      e.preventDefault();
      modal[i].style.display = 'block';
    });
  }
  // закрываем окно задачи без сохранения
  for (let i = 0; i < closeBtn.length; i += 1) {
    closeBtn[i].addEventListener('click', () => {
      modal[i].style.display = 'none';
    });
  }
}
