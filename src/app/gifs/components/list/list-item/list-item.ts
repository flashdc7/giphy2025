import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {
  // todo: imageURL: string input
  imageURL= input.required<string>();
}
