import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '../../../services/devices.service';
import { Device } from '../../../services/models/device';
import { EventMqttService } from 'src/app/services/event.mqtt.service.ts.service';

import { IMqttMessage } from "ngx-mqtt";
import { Subscription } from 'rxjs';
import { LogTelemetry, Telemetry } from 'src/app/services/models/telemetry';
import { Chart } from 'node_modules/chart.js';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {

  device: Device;
  subscriptionAction: Subscription;
  subscriptionStatus: Subscription;
  subscriptionTelemetry: Subscription;

  dpFrom: NgbDateStruct;
  dpTo: NgbDateStruct;
  today: boolean = true;

  myChart: any;


  logTelemetry: Array<LogTelemetry> = [];

  constructor(
    private route: ActivatedRoute, 
    private devicesService: DevicesService, 
    private readonly eventMqtt: EventMqttService) {
  }

  async ngOnInit() {
    const deviceId = this.route.snapshot.params["deviceId"];
    try {
      this.device = await this.devicesService.getDevice(deviceId);
      this.subscribeToChannel();
      this.subscribeToStatus();
      this.subscribeToTelemetry();
      this.logTelemetry = await this.devicesService.getTodayTelemetry(deviceId);

      this.renderChart();
    }
    catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionAction)
      this.subscriptionAction.unsubscribe();

    if (this.subscriptionStatus)
      this.subscriptionStatus.unsubscribe();

    if (this.subscriptionTelemetry)
      this.subscriptionTelemetry.unsubscribe();
  }


  async updateChart() {

    if (this.today) {
      try {
        this.logTelemetry = await this.devicesService.getTodayTelemetry(this.device.nombre);
        this.renderChart();
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        this.logTelemetry = await this.devicesService.getFromToTelemetry(
          this.device.nombre,
          this.dpFrom.day, this.dpFrom.month, this.dpFrom.year,
          this.dpTo.day, this.dpTo.month, this.dpTo.year);

        this.renderChart();
      }
      catch (err) {
        console.log(err);
      }
    }
  }



  private subscribeToChannel() {
    this.subscriptionAction = this.eventMqtt.topic('device/action')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());

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


  private subscribeToStatus() {
    this.subscriptionStatus = this.eventMqtt.topic('device/status')
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

  private subscribeToTelemetry() {
    this.subscriptionTelemetry = this.eventMqtt.topic('device/telemetry')
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        if (this.device.nombre == item.Device) {
          this.device.ultimaTele.Temperatura = item.Valores.Temperatura;
          this.device.ultimaTele.Humedad = item.Valores.Humedad;
          this.device.ultimaTele.ts = item.Valores.ts;
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


  private renderChart () {
    // Se arman las series de tiempo para cada uno de las magnitudes medidas
    let hum = [];
    let temp = [];
    let ts = [];

    // Las telemetrías vienen en bloques de 144 mediciones, se las junta
    this.logTelemetry.forEach(telemetryBlock => {

      let lastHum;
      let humBlock = telemetryBlock.telemetry
        .map(a => {
          let ret;
          if (a.Humedad <=100)
            ret = a.Humedad;
          else
            ret = lastHum;
          lastHum = ret;
          return ret;
        });

      let lastTemp;
      let tempBlock = telemetryBlock.telemetry
        .map(a => {
          let ret;
          if (a.Temperatura <=200)
            ret = a.Temperatura;
          else
            ret = lastTemp;
            lastTemp = ret;
          return ret;
        });

      let tsBlock = telemetryBlock.telemetry.map(a => {
        let date = new Date(a.ts * 1000);
        return date.toLocaleDateString("es-AR") + " - " + date.toLocaleTimeString("es-AR");
      });

      hum = hum.concat(humBlock);
      temp = temp.concat(tempBlock);
      ts = ts.concat(tsBlock);
    })
    
    // Se crea o se actualiza el chart
    if (this.myChart)
      this.myChart.destroy();

    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ts,
        datasets: [{
          label: 'Humedad',
          data: hum,
          //fill: true,
          borderColor: 'rgb(102, 153, 255)',
          //backgroundColor: 'rgb(82, 153, 255)',

          tension: 0.1
        },
        {
          label: 'Temperatura',
          data: temp,
          //fill: true,
          backgroundColor: 'rgb(255, 255, 153)',
          borderColor: 'rgb(255, 0, 0)',
          tension: 0.1
        },]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 20
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}


