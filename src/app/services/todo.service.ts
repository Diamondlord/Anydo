import { Injectable } from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import {ADD_TODO, CLICK_TODO, REMOVE_TODO} from '../store/reducers/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _store: Store<any>) {}

  getTodoList(): Observable<any> {
    return this._store.pipe(select('todo'));
  }

  addTodo(task) {
    this._store.dispatch({type: ADD_TODO, payload: task});
  }

  removeTodo(id) {
    this._store.dispatch({type: REMOVE_TODO, payload: id});
  }

  clickTodo(id, checked) {
    this._store.dispatch({type: CLICK_TODO, payload: {id: id, checked: checked} });
  }
}
