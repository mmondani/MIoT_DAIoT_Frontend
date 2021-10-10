import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../../services/devices.service';
import { Device } from 'src/app/services/models/device';
import { EventMqttService } from 'src/app/services/event.mqtt.service.ts.service';

import { IMqttMessage } from "ngx-mqtt";
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  addDeviceForm: FormGroup;
  deviceTipos = ["Termohigrómetro"];

  devicesList: Array<Device> = [];
  subscription: Subscription;
  constructor(private devicesService: DevicesService, private readonly eventMqtt: EventMqttService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.createAddDeviceForm();

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

  async addDevice() {
    console.log("agregar dispositivo");

    try {
      await this.devicesService.newDevice(new Device(
        this.addDeviceForm.get("nombre").value,
        this.addDeviceForm.get("empresa").value,
        this.addDeviceForm.get("tipo").value
      ));

      this.devicesList = await this.devicesService.getDevices();
    }
    catch(err) {
      console.log(err);
    }
  }


  openModal(content) {
    // Se limpia el formulario
    this.addDeviceForm.reset();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  private createAddDeviceForm() {
    this.addDeviceForm = new FormGroup({
      "nombre": new FormControl(null, Validators.required),
      "empresa": new FormControl(null, Validators.required),
      "tipo": new FormControl(null, Validators.required)
    });
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
