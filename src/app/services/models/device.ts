import { Telemetry } from "./telemetry";

export class Device {
    _id: string = "";
    nombre: string = "";
    tipo: string = "";
    empresa: string = "";
    online: boolean = false;
    canal1: boolean = false;
    canal2: boolean = false;
    __v: number = 0;
    ultimaTemp: number = 0;
    ultimaHum: number = 0;
    variables: object = {};
    ultimaTele: {
        Temperatura: Number,
        Humedad: Number,
        ts: Number
    };
}