import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '../../../services/devices.service';
import { Device } from '../../../services/models/device';
import { EventMqttService } from 'src/app/services/event.mqtt.service.ts.service';

import { IMqttMessage } from "ngx-mqtt";
import { Subscription } from 'rxjs';
import { LogTelemetry, Telemetry } from 'src/app/services/models/telemetry';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  device: Device;
  subscription: Subscription;
  subscriptionStatus: Subscription;

  logTelemetry: Array<LogTelemetry> = [];
  //  devicesList: Array<Device> = [];

  constructor(private route: ActivatedRoute, private devicesService: DevicesService, private readonly eventMqtt: EventMqttService) {

  }

  async ngOnInit() {
    const deviceId = this.route.snapshot.params["deviceId"];
    try {
      this.device = await this.devicesService.getDevice(deviceId);
      this.subscribeToChannel();
      this.subscribeToStatus();
      this.subscribeToTelemetry();
      this.logTelemetry = await this.devicesService.getTodayTelemetry(deviceId);
      console.log(this.logTelemetry);
    }
    catch (err) {
      console.log(err);
    }
    //var ctx = document.getElementById('myChart').getContext('2d');
    //                {{this.logTelemetry[0].telemetry[0].Humedad}}
    let hum = this.logTelemetry[0].telemetry.map(a => a.Humedad);
    let temp = this.logTelemetry[0].telemetry.map(a => a.Temperatura);
    let ts = this.logTelemetry[0].telemetry.map(a => a.ts);
    console.log("hum:" + hum);

    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ts,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Humedad',
          data: hum,//[12, 19, 3, 5, 2, 3],
          //fill: true,
          borderColor: 'rgb(102, 153, 255)',
          //backgroundColor: 'rgb(82, 153, 255)',

          tension: 0.1
        },
        {
          label: 'Temperatura',
          data: temp,//[12, 19, 3, 5, 2, 3],
          //fill: true,
          backgroundColor: 'rgb(255, 255, 153)',
          borderColor: 'rgb(255, 0, 0)',
          tension: 0.1
        },]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  subscribeToChannel() {
    this.subscriptionStatus = this.eventMqtt.topic('device/action')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        console.log("NUEVO STATUS " + data.payload.toString());
        if (this.device.nombre == item.Device) {
          if (item.Valores.Canal == 1) {
            this.device.canal1 = item.Valores.Estado;
          }
          else {
            this.device.canal2 = item.Valores.Estado;
          }
        }
      });
  }
  subscribeToStatus() {
    this.subscription = this.eventMqtt.topic('device/status')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        if (this.device.nombre == item.Device) {
          if (item.Status == "online") {
            this.device.online = true;
          }
          else {
            this.device.online = false;
          }
        }
      });
  }

  updateChannel(canal: number, status: boolean) {
    const deviceId = this.route.snapshot.params["deviceId"];

    try {
      this.devicesService.putUpdateChannel(this.device.nombre, canal, status);
    } catch (error) {
      console.log(error);

    }
  }
  private subscribeToTelemetry() {
    this.subscription = this.eventMqtt.topic('device/telemetry')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        if (this.device.nombre == item.Device) {
          this.device.ultimaHum = item.Valores.Temperatura;
          this.device.ultimaTemp = item.Valores.Humedad;
        }
      });
  }
}


