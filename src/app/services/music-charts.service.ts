import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MusicChartsService {
  constructor(private httpClient: HttpClient) {}

  getMusicCharts(): Observable<any> {
    return this.httpClient
      .get<any>(environment.shazamApiBaseUrl, {
        headers: new HttpHeaders()
          .set(
            environment.XRapidAPIHostHeaderName,
            environment.XRapidAPIHostHeaderValue
          )
          .set(
            environment.XRapidAPIKeyHeaderName,
            environment.XRapidAPIKeyHeaderValue
          ),
      })
      .pipe(
        map((response: any) =>
          response.chart_items.map((chartItem: any) => ({
            title: chartItem.item.title,
            artist: chartItem.item.artist_names,
            imageUrl: chartItem.item.song_art_image_url,
          }))
        )
      );
  }
}
