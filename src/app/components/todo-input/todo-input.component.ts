import {Component, OnInit} from '@angular/core';
import {TodoElement} from '../../shared/classes/todo-element';
import {TodoService} from '../../services/todo.service';
import {generateID} from '../../shared/functions/generate-id';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  addTodo(_task) {
    const task = new TodoElement(generateID(), _task.value, false);
    this.todoService.addTodo(task);
    _task.value = '';
  }

}
