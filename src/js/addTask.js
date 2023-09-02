// TODO: write your code here
// открываем окно с добавлением задачи
// добавляем задачу в нужное окно и сохраняем в localStorag

export default function addWrite() {
  const addTask = Array.from(document.getElementsByClassName('add_task'));
  const modal = document.querySelectorAll('.window_modal');
  const textTask = document.querySelectorAll('.text_task');
  for (let i = 0; i < addTask.length; i += 1) {
    addTask[i].addEventListener('click', (e) => {
      e.preventDefault();
      if (textTask[i].value.trim() === '') {
        alert('Невозможно сохранить пустую задачу!');
        modal[i].style.display = 'none';
      } else {
        modal[i].style.display = 'none';
        const colName = document.querySelectorAll('.column_title')[i];
        if (localStorage.getItem(colName.textContent)) {
          const getArr = JSON.parse(localStorage.getItem(colName.textContent));
          getArr.push(textTask[i].value);
          localStorage.setItem(colName.textContent, JSON.stringify(getArr));
        } else {
          const arrTasks = [];
          const tasks = textTask[i].value;
          arrTasks.push(tasks);
          localStorage.setItem(colName.textContent, JSON.stringify(arrTasks));
        }
        window.location.reload();
      }
    });
  }
}
