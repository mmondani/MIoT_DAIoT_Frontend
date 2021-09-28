import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../../services/devices.service';
import { Device } from 'src/app/services/models/device';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  devicesList: Array<Device> = [];

  constructor(private devicesService: DevicesService) { }

  async ngOnInit() {
    try {
      this.devicesList = await this.devicesService.getDevices()
    }
    catch(err) {
      console.log(err);
    }
  }

  deviceClick(deviceName: string) {
    console.log(deviceName);
  }

  addDevice() {
    console.log("agregar dispositivo");
  }
}
