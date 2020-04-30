import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerUpdateService {
  promptEvent = null;
  installEnable = new BehaviorSubject(false);
  constructor(private swUpdate: SwUpdate,
              private snackbar: MatSnackBar) {

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.promptEvent = event;
      this.installEnable.next(true);
      console.info('beforeinstallprompt', event);
    });

    window.addEventListener('appinstalled', (evt) => {
      console.info('appinstalled', 'installed');
    });

    if (swUpdate.isEnabled) {
      timer(1000, 1000 * 60 * 3).subscribe(() => swUpdate.checkForUpdate());
    }

    swUpdate.available.subscribe(evt => {
      console.info('WorkerUpdateService', evt);
      const snack = this.snackbar.open('Update Available', 'Reload');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });
  }
}
