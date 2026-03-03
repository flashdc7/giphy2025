import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { List } from '../../components/list/list';
import { GifService } from '../../services/GifService';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page-component',
  imports: [List],
  templateUrl: './search-page-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  gifService= inject(GifService);
  gifs= signal<Gif[]>([])

  onSearch(query: string){
    // console.log({query});
    this.gifService.searchGifs(query).subscribe((resp)=>{
      // console.log(resp);
      console.log(resp);
      this.gifs.set(resp)
    });
  }
}
