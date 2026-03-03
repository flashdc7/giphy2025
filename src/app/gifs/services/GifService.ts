import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private http= inject(HttpClient);
  trendingGifs= signal<Gif[]>([]);
  trendingGifsLoading= signal(true);

  constructor() {
    this.loadTrendingGifs();
  }


  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,
      {
        params: {
          api_key:environment.gifApiKey,
          limit:20,
        }
      }
    ).subscribe((resp)=>{
      // console.log(resp);
      const gifs= GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log(gifs);

    })
  }

  searchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
      {
        params: {
          api_key:environment.gifApiKey,
          limit:20,
          q: query
        }
      }
    ).pipe(
      // map( (resp)=> console.log({ tap: resp})
      map( ({ data })=> data),
      map((items)=>GifMapper.mapGiphyItemsToGifArray(items)),

      // todo: historial
    )
    // .subscribe((resp)=>{
    //   // console.log(resp);
    //   const gifs= GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log(gifs);

    // })
  }

}
