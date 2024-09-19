import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import { ADD_TODO, CLICK_TODO, INIT_TODO, REMOVE_TODO } from '../store/reducers/todo';
import {addTodo, getTodoes, initDB, removeTodo} from '../shared/functions/indexedDB';
import { TodoElement } from '../shared/classes/todo-element';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private _store: Store<{ todo: TodoElement[]}>) {
    initDB().then(() => this.initTodoList());
  }

  initTodoList() {
    getTodoes().then(list => {
      this._store.dispatch({type: INIT_TODO, payload: list});
    }).catch(err => console.log('Oooops', err));
  }

  getTodoList(): Observable<TodoElement[]> {
    return this._store.select(state => state.todo);
  }

  // getTodoList(): Observable<TodoElement[]> {
  //   // return this._store.pipe(select('todo'));
  //   return this._store.pipe();
  // }

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
