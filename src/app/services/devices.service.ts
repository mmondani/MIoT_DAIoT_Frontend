import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './models/device';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, pluck, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private URL = "http://localhost:3000";

  devices: Array<Device> = [
    {_id: "1", nombre: "Device 1", tipo: "Termohigrómetro", empresa: "Empresa 1", __v: 0, variables: {}},
    {_id: "2", nombre: "Device 2", tipo: "Termohigrómetro", empresa: "Empresa 2", __v: 0, variables: {}},
    {_id: "3", nombre: "Device 3", tipo: "Termohigrómetro", empresa: "Empresa 3", __v: 0, variables: {}},
    {_id: "4", nombre: "Device 4", tipo: "Termohigrómetro", empresa: "Empresa 4", __v: 0, variables: {}}
  ];

  constructor(private http: HttpClient) { }

  public getDevices(): Promise<Array<Device>> {
    return new Promise((resolve, reject) => {
      resolve(this.devices);
    });
    /*
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Array<Device>>(this.URL + "/dispo", options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
      */
  }
}
