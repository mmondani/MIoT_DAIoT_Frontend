import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '../../../services/devices.service';
import { Device } from '../../../services/models/device';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  device: Device;

  constructor(private route: ActivatedRoute, private devicesService: DevicesService) { }

  async ngOnInit() {
    const deviceId = this.route.snapshot.params["deviceId"];

    try {
      this.device = await this.devicesService.getDevice(deviceId);
    }
    catch(err) {
      console.log(err);
    }
  }

}
