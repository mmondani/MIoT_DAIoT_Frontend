import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './models/device';
import { LogTelemetry, Telemetry } from './models/telemetry';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, pluck, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private URL = "http://localhost:3000";
  private CORE = "http://localhost:3001";

  devices: Array<Device> = [
    // {_id: "1", nombre: "Device 1", tipo: "Termohigrómetro", empresa: "Empresa 1", __v: 0, online: true, canal1: true, canal2: false, variables: {}},
    // {_id: "2", nombre: "Device 2", tipo: "Termohigrómetro", empresa: "Empresa 2", __v: 0, online: true, canal1: false, canal2: false, variables: {}},
    // {_id: "3", nombre: "Device 3", tipo: "Termohigrómetro", empresa: "Empresa 3", __v: 0, online: false, canal1: true, canal2: false, variables: {}},
    // {_id: "4", nombre: "Device 4", tipo: "Termohigrómetro", empresa: "Empresa 4", __v: 0, online: true, canal1: true, canal2: true, variables: {}}
  ];

  constructor(private http: HttpClient) { }

  public getDevices(): Promise<Array<Device>> {
    /*
    return new Promise((resolve, reject) => {
      resolve(this.devices);
    });*/
    
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Array<Device>>(this.URL + "/dispo", options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
      
  }

  public getDevice(nombre: string): Promise<Device> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Device>(this.URL + "/dispo/" + nombre, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
      
  }


  public putUpdateChannel(nombre:string,canal: number,estado:boolean): Promise<Device> {
    let options = {
      observe: 'response' as const
    };
    const data={
      "Device": nombre,
      "Command": estado?'on':'off',
      "Parameter": canal==1?"1":"2"
  }
    return this.http
      .post<Device>(this.CORE + "/command" ,data, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
      
  }

  public getTodayTelemetry(nombre:string): Promise <Array<LogTelemetry>>{
    let options = {
      observe: 'response' as const
    };
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return this.http
      .get<Array<LogTelemetry>>(this.URL + "/datos/"+nombre+"/"+date, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
      
  }
}
