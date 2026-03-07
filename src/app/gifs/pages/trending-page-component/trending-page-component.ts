import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { List } from "../../components/list/list";
import { GifService } from '../../services/GifService';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page-component',
  // imports: [List],
  templateUrl: './trending-page-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent implements AfterViewInit {
  // urlGifs = signal(imageUrls);
  gifService= inject(GifService)
  scrollStateService= inject(ScrollStateService);

  scrollDivRef= viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv= this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;

    scrollDiv.scrollTop= this.scrollStateService.trendingScrollstate()

  }

  onScroll(event: Event){
    const scrollDiv= this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;

    const scrollTop= scrollDiv.scrollTop;
    const clientHeight= scrollDiv.clientHeight;
    const scrollHeight= scrollDiv.scrollHeight;

    const isAtBottom= scrollTop + clientHeight > (scrollHeight - 300);
    this.scrollStateService.trendingScrollstate.set(scrollTop);
    // console.log({isAtBottom});
    if( isAtBottom ){
      // todo: cargar la siguiente pagina
      this.gifService.loadTrendingGifs();
    }

  }
}
