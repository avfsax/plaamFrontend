import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLong',
})
export class TextLongPipe implements PipeTransform {
  transform(text: string, max: number = 150): string {
    if (!text) {
      return text;
    }

    if (text.length > max) text = text.slice(0, max) + '...';

    text = text.replaceAll('<p>', '');
    text = text.replaceAll('</p>', '');

    return text;
  }
}
