import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventMqttService {

  private endpoint: string;

  constructor(
    private _mqttService: MqttService,
  ) {
    this.endpoint = '';
  }

  topic(deviceId: string): Observable<IMqttMessage> {
    let topicName = `${this.endpoint}/${deviceId}`;     
    return this._mqttService.observe(deviceId);
  }

  unsafePublish(topic: string,message:string) {
    let topicName = '';//`/${this.endpoint}/${deviceId}`;     
    return this._mqttService.unsafePublish(topic,message);
  }
}
