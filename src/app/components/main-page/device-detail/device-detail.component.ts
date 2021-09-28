import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  deviceId: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.params["deviceId"];
  }

}
