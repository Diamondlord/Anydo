import {Component, OnInit} from '@angular/core';
import {TodoElement} from '../../shared/classes/todo-element';
import {TodoService} from '../../services/todo.service';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  $todoList: Observable<Array<TodoElement>>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.$todoList = this.todoService.getTodoList();
    // this.$todoList.subscribe(res => {
    //   console.log('$todoList', res);
    // });
  }

  onRemoveTodo(id) {
    this.todoService.removeTodo(id);
  }

  onClickTodo(todo) {
    const todoChanged = Object.assign({}, todo);
    todoChanged.checked = todoChanged.checked ? 0 : 1;
    this.todoService.clickTodo(todoChanged);
  }
}
