import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoElement} from '../../shared/classes/todo-element';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: TodoElement;
  @Output() clickTodo = new EventEmitter<boolean>();
  @Output() removeTodo = new EventEmitter<boolean>();

  clickTodoEmit(todo) {
    this.clickTodo.emit(todo);
  }

  removeTodoEmit(id) {
    this.removeTodo.emit(id);
  }
}
