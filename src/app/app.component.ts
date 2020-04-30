import { Component } from '@angular/core';
import {WorkerUpdateService} from './services/worker-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO';
  constructor(private _update: WorkerUpdateService) {}
}
