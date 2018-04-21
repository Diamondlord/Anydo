let open: any;
export function initDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      const err = 'This browser doesn\'t support IndexedDB';
      reject(err);
    }
    open = indexedDB.open('AnyDo', 1);
    open.onupgradeneeded = () => {
      const db = open.result;
      db.createObjectStore('todoes', {keyPath: 'id'});
    };
    open.onsuccess = (event) => {
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
    if (open) {
      const db = open.result;
      const tx = db.transaction('todoes', 'readwrite');
      const store = tx.objectStore('todoes');
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
    if (open) {
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
    if (open) {
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

// function txOnFinish (tx, resolve, reject) {
//
// }
