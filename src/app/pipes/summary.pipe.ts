import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
  standalone: true
})
export class SummaryPipe implements PipeTransform {

  // limit is optional here. use it on html like ... | summary: limit 
  transform(value: string, limit?: number): string | null {

    if (!value) return null;

    limit = limit? limit: 100;

    // Return full description if limit is higher than 100
    if (limit > 100) return value;

    return value.substring(0, limit) + '...'
    
  }

}
