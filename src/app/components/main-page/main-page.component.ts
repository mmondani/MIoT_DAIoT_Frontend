import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { EventMqttService } from 'src/app/services/event.mqtt.service.ts.service';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  events: any[];
  private deviceId: string;

  constructor(private loginService: LoginService) {
  }

  async ngOnInit() {
  }

  public logout() {
    this.loginService.logout();
  }

}
