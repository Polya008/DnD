// TODO: write your code here
// перемещение задач между блоками

export default function dragAndDrop() {
  const container = document.getElementById('vidgets');
  let draggedEl;
  let ghostEl;
  let topDiff = null;
  let leftDiff = null;

  container.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('task')) {
      e.target.style.cursor = 'grabbing';
      draggedEl = e.target;
      ghostEl = e.target.cloneNode(true);
      ghostEl.classList.add('dragged');
      document.body.appendChild(ghostEl);
      ghostEl.style.width = `${draggedEl.offsetWidth}px`;
      const { top, left } = draggedEl.getBoundingClientRect();
      topDiff = e.pageY - top;
      leftDiff = e.pageX - left;
      ghostEl.style.left = `${left}px`;
      ghostEl.style.top = `${top}px`;
    }
  });

  container.addEventListener('mousemove', (e) => {
    e.preventDefault(); // не даём выделять элемент
    if (draggedEl) {
      ghostEl.style.left = `${e.pageX - leftDiff}px`;
      ghostEl.style.top = `${e.pageY - topDiff}px`;
      draggedEl.style.display = 'none';
    }
  });

  container.addEventListener('mouseup', (e) => {
    e.preventDefault();
    if (!draggedEl) {
      return;
    }
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    const ul = elem.closest('.list');
    const columnName = draggedEl.closest('.vidget').querySelector('.column_title').textContent;
    if (ul) {
      ul.insertBefore(draggedEl, elem);
      draggedEl.style.display = 'flex';
      e.target.style.cursor = 'auto';
      ghostEl.style.display = 'none';
      // удаление из localStorage из старой колонки
      const delStorage = JSON.parse(localStorage.getItem(columnName));
      const indexDelete = delStorage.indexOf(draggedEl.firstChild.textContent);
      if (indexDelete > -1) {
        delStorage.splice(indexDelete, 1);
        localStorage.setItem(columnName, JSON.stringify(delStorage));
      }
      // сохранение в localStorage в новой колонке
      const textDragged = draggedEl.firstChild.textContent;
      const storageName = ul.closest('.vidget').querySelector('.column_title').textContent;
      const getStor = JSON.parse(localStorage.getItem(storageName));
      const textElem = elem.querySelector('.text').textContent;
      const indexElem = getStor.indexOf(textElem);

      if (getStor) {
        if (indexElem === 0) {
          getStor.unshift(textDragged);
          localStorage.setItem(storageName, JSON.stringify(getStor));
        } else if (indexElem > 0) {
          getStor.splice(indexElem, 0, textDragged);
          localStorage.setItem(storageName, JSON.stringify(getStor));
        }
      }
    }

    // сбрасываем переносимый элемент и призрак
    draggedEl = null;
    ghostEl = null;
  });
}

// if(!ul.hasChildNodes()) {
// добавляем в localStorage, если этот массив пустой
// const newStorage = [];
// newStorage.push(textDragged);
// localStorage.setItem(storageName, JSON.stringify(newStorage));
// }

// if(ul.classList.contains("list_todo")) {
// let get = JSON.parse(localStorage.getItem("TODO"));
// get.unshift(textDragged);
// localStorage.setItem("TODO", JSON.stringify(get))