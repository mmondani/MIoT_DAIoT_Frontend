import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventMqttService {

  private endpoint: string;

  constructor(private _mqttService: MqttService) {}

  topic(topic: string): Observable<IMqttMessage> {
    return this._mqttService.observe(topic);
  }

  unsafePublish(topic: string,message:string) {   
    return this._mqttService.unsafePublish(topic,message);
  }
}
