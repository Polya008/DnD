// TODO: write your code here
import addWrite from './addTask';
import addCross from './cross';
import Modal from './Modal';
import dragAndDrop from './dragAndDrop';

Modal();
addWrite();
addCross();
dragAndDrop();

function printTask(columnName, listName) {
  const getStorage = JSON.parse(localStorage.getItem(columnName));
  if (getStorage) {
    getStorage.forEach((elem) => {
      const taskForPrint = document.createElement('li');
      taskForPrint.className = 'task';
      taskForPrint.innerHTML += `<span class="text">${elem}</span><button type="button" class="cross">&#10007</button>`;
      document.getElementsByClassName(listName)[0].appendChild(taskForPrint);

      taskForPrint.querySelector('.cross').addEventListener('click', (e) => {
        e.preventDefault();
        const textTask = taskForPrint.querySelector('.text').textContent;
        if (getStorage.includes(textTask)) {
          const numForDelete = getStorage.indexOf(textTask);
          getStorage.splice(numForDelete, 1);
          localStorage.setItem(columnName, JSON.stringify(getStorage));
          window.location.reload();
        }
      });
    });
  }
}

printTask('TODO', 'list_todo');
printTask('IN PROGRESS', 'list_in_progress');
printTask('DONE', 'list_done');
