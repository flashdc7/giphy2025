import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { ListItem } from "./list-item/list-item";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [ListItem],
  templateUrl: './list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  // todo: input string[]
  gifs= input.required<Gif[]>();
}
