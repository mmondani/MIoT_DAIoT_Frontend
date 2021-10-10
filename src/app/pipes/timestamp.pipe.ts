import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: Number): string {
    if (value === 0) {
      return "--"
    }
    
    let date = new Date(<number>value * 1000);
    return date.toLocaleDateString("es-AR") + " - " + date.toLocaleTimeString("es-AR");
  }

}
