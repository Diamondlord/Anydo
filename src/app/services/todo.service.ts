import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import {ADD_TODO, CLICK_TODO, INIT_TODO, REMOVE_TODO} from '../store/reducers/todo';
import {addTodo, getTodoes, initDB, removeTodo} from '../shared/functions/indexedDB';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private _store: Store<any>) {
    initDB().then(() => this.initTodoList());
  }

  initTodoList() {
    getTodoes().then(list => {
      this._store.dispatch({type: INIT_TODO, payload: list});
    }).catch(err => console.log('Oooops', err));
  }

  getTodoList(): Observable<any> {
    return this._store.pipe(select('todo'));
  }

  addTodo(task) {
    addTodo(task).then(
      () => this._store.dispatch({type: ADD_TODO, payload: task})
    );
  }

  removeTodo(id) {
    removeTodo(id).then(
      () => this._store.dispatch({type: REMOVE_TODO, payload: id})
    );
  }

  clickTodo(todo) {
    addTodo(todo).then(
      () => this._store.dispatch({type: CLICK_TODO, payload: {id: todo.id, checked: todo.checked}})
    );
  }
}
