import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'readableTime',
  standalone: true,
})
export class ReadableTimePipe implements PipeTransform {
  transform(value: Date): string {
    const now = moment();
    const date = moment(value);

    const diff = now.diff(date, 'minutes');

    if (diff < 60) {
      return `${diff} mins ago`;
    } else if (diff < 24 * 60) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else if (diff < 30 * 24 * 60) {
      return `${Math.floor(diff / (24 * 60))} days ago`;
    } else if (diff < 12 * 30 * 24 * 60) {
      return `${Math.floor(diff / (30 * 24 * 60))} months ago`;
    } else {
      return `${Math.floor(diff / (12 * 30 * 24 * 60))} years ago`;
    }
  }
}
