import { Component, AfterViewChecked } from '@angular/core';
import { searchAgain } from '../shared/services/scroll.service';
import {Event,NavigationCancel,NavigationEnd,NavigationError, NavigationStart,Router} from '@angular/router';
declare var componentHandler: any;
@Component({
  selector: 'main-block',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class MainComponent {
  //clean this up
  loading = false;
  public loadingInProgress = false;
  public searched = false;
  private pageLoadingFinished = false;
  public playlistElement: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          //console.log(event);
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          //console.log(event);
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngAfterViewChecked() {
    componentHandler.upgradeAllRegistered();
  }

  searchMore(): void {
    searchAgain.emit(null);
  }
}
