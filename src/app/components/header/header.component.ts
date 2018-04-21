import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {getTodoesPercentDone} from '../../shared/functions/indexedDB';

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
    this.todoService.getTodoList().subscribe(() => {
      // const total = todoes.length;
      // const checked = todoes.filter(_todo => _todo.checked).length;
      // this.$value = total ? checked / total * 100 : 0;
      // just for learning indexeddb
      getTodoesPercentDone().then(
        (res: number) => {
          this.$value = res;
          console.log('getTodoesPercentDone', res);
        }
      ).catch(err => console.log(err));
      }
    );

  }

}
