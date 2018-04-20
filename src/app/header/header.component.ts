import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  $value = 0;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().subscribe( todoes => {
      const total = todoes.length;
      const checked = todoes.filter(todo => todo.checked).length;
      this.$value = total ? checked / total * 100 : 0;
      }
    );
  }

}
