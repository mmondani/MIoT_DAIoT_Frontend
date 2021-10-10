import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../../services/devices.service';
import { Device } from 'src/app/services/models/device';
import { EventMqttService } from 'src/app/services/event.mqtt.service.ts.service';

import { IMqttMessage } from "ngx-mqtt";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  devicesList: Array<Device> = [];
  subscription: Subscription;
  constructor(private devicesService: DevicesService, private readonly eventMqtt: EventMqttService) { }

  async ngOnInit() {
    try {
      this.devicesList = await this.devicesService.getDevices();
      this.subscribeToTelemetry();
      this.subscribeToStatus();
    }
    catch (err) {
      console.log(err);
    }
  }

  deviceClick(deviceName: string) {
    console.log(deviceName);
  }

  addDevice() {
    console.log("agregar dispositivo");
  }
  private subscribeToTelemetry() {
    this.subscription = this.eventMqtt.topic('device/telemetry')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        this.devicesList.forEach(element => {
          if (element.nombre == item.Device) {
            element.ultimaHum=item.Valores.Temperatura;
            element.ultimaTemp=item.Valores.Humedad;
          }
        });
      });
  }
  private subscribeToStatus() {
    this.subscription = this.eventMqtt.topic('device/status')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        this.devicesList.forEach(element => {
          if (element.nombre == item.Device) {
            if(item.Status=="online"){
            element.online=true;}
            else{            
              element.online=false;
            }

          }
        });

      });
  }
}
