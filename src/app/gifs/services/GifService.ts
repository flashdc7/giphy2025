import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY='gifs'
const loadFromLocalStorage= ()=>{
  const gifsFromLocalStorage= localStorage.getItem(GIF_KEY) ?? '[]';
  const gifs= JSON.parse(gifsFromLocalStorage);

  return gifs;
}

@Injectable({
  providedIn: 'root'
})

export class GifService {
  private http= inject(HttpClient);
  trendingGifs= signal<Gif[]>([]);
  trendingGifsLoading= signal(true);

  searchHistory= signal< Record<string, Gif[]> >( loadFromLocalStorage() );
  searchHistoryKeys= computed( ()=> Object.keys( this.searchHistory() ) );

  saveToLocalStorage= effect( ()=>{
    const historyString= JSON.stringify(this.searchHistory())
    localStorage.setItem(GIF_KEY, historyString);
  })

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

      // historial
      tap( (items)=> {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
        console.log(this.searchHistory);

      }),
    )
    // .subscribe((resp)=>{
    //   // console.log(resp);
    //   const gifs= GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log(gifs);

    // })
  }

  getHistoryGifs(query: string){
    return this.searchHistory()[query] ?? [];
  }

}
