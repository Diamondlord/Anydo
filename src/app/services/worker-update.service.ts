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
      console.log('beforeinstallprompt', event);
    });

    window.addEventListener('appinstalled', (evt) => {
      console.log('appinstalled', 'installed', evt);
    });

    if (swUpdate.isEnabled) {
      timer(1000, 1000 * 60 * 3).subscribe(() => swUpdate.checkForUpdate());
    }

    swUpdate.versionUpdates.subscribe(evt => {
      if (evt.type === 'VERSION_READY') {
        console.log('WorkerUpdateService', evt);
        const snack = this.snackbar.open('Update Available', 'Reload');

        snack
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });
      }
    });
  }
}
