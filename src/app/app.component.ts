import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'daiot';
  public isCollapsed: boolean = false;

  public toggleCollapse () {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }
}
