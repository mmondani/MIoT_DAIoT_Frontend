export class LogTelemetry {
    _id: string = "";
    dia: string = "";
    nombre: string = "";
    __v: number = 0;
    nsamples: number = 0;
    primero: string = "";
    telemetry: Array<Telemetry> = [];
}

export class Telemetry {
    ts: number = 0;
    Temperatura: number = 0;
    Humedad: number = 0;
}

