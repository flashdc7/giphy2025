import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal} from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/GifService';
import { List } from '../../components/list/list';

@Component({
  selector: 'app-gif-history',
  imports: [List],
  templateUrl: './gif-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistory {
  // query= inject(ActivatedRoute).params.subscribe( params=> {
  //   console.log({ params });
  // } )

  gifService= inject(GifService);
  query= toSignal(
    inject(ActivatedRoute).params.pipe( map((params) => params['query']))
  );

  gifsKey=computed(()=>this.gifService.getHistoryGifs(this.query()))
}
