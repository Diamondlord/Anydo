const open = indexedDB.open('AnyDo', 3);
let registered = false;
export function initDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      const err = 'This browser doesn\'t support IndexedDB';
      reject(err);
    }
    open.onupgradeneeded = (event) => {
      const db = open.result;
      if (event.oldVersion < 1) {
        const store = db.createObjectStore('todoes', {keyPath: 'id'});
        store.createIndex('checked', 'checked');
      }
      if (event.oldVersion < 3) {
        open.transaction.objectStore('todoes').createIndex('checked', 'checked');
      }
    };
    open.onsuccess = (event) => {
      registered = true;
      resolve(event);
    };
    open.onerror = (event) => {
      reject(event);
    };
    return true;
  });

}

export function addTodo(todo) {
  return new Promise((resolve, reject) => {
    if (registered) {
      const db = open.result;
      const tx = db.transaction('todoes', 'readwrite');
      const store = tx.objectStore('todoes');
      if (!todo.checked) {
        delete todo.checked;
      }
      store.put(todo);
      tx.oncomplete = (event) => {
        resolve(event);
      };
      tx.onerror = (event) => {
        reject(event);
      };
    } else {
      reject('addTodo connection access problem');
    }
  });
}

export function removeTodo(id) {
  return new Promise((resolve, reject) => {
    if (registered) {
      const db = open.result;
      const tx = db.transaction('todoes', 'readwrite');
      const store = tx.objectStore('todoes');
      store.delete(id);
      tx.oncomplete = (event) => {
        resolve(event);
      };
      tx.onerror = (event) => {
        reject(event);
      };
    } else {
      reject('removeTodo connection access problem');
    }
  });
}

export function getTodoes() {
  return new Promise((resolve, reject) => {
    if (registered) {
      const db = open.result;
      const tx = db.transaction('todoes', 'readonly');
      const store = tx.objectStore('todoes');
      const getAll = store.getAll();
      tx.oncomplete = () => {
        resolve(getAll.result);
      };
      tx.onerror = (event) => {
        reject(event);
      };
    } else {
      reject('getTodoes connection access problem');
    }
  });
}

export function getTodoesPercentDone() {
  return new Promise((resolve, reject) => {
    if (registered) {
      const db = open.result;
      const tx = db.transaction('todoes', 'readonly');
      const store = tx.objectStore('todoes');
      const count = store.count();
      const countChecked = store.index('checked').count(1);
      tx.oncomplete = () => {
        const percent = count.result ? countChecked.result / count.result * 100 : 0;
        resolve(percent);
      };
      tx.onerror = (event) => {
        reject(event);
      };
    } else {
      reject('getTodoes connection access problem');
    }
  });
}

// function txOnFinish (tx, resolve, reject) {
//
// }
