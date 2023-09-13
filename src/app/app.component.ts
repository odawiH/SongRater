import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cardAnimation } from 'src/animations/card-animation';

import { Tracks } from './models/track.model';
import { MusicChartsService } from './services/music-charts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [cardAnimation],
})
export class AppComponent implements OnInit {
  constructor(private musicChartsService: MusicChartsService) {}

  dataSubject: BehaviorSubject<{ label: string; value: number }[]> =
    new BehaviorSubject<{ label: string; value: number }[]>([]);

  data$: Observable<{ label: string; value: number }[]> =
    this.dataSubject.asObservable();

  tracklist: Tracks[] = [];
  isLoading = false;
  isTrackAvailable = false;
  currentIndex = 0;
  likedCounter = 0;
  dislikedCounter = 0;
  totalCounter = 0;
  chartData: { label: string; value: number }[] = [];
  cardAnimation = 'in';

  ngOnInit(): void {
    this.isLoading = true;
    // this.musicChartsService.getMusicCharts().subscribe((musicCharts) => {
    //   this.tracklist = musicCharts;
    //   this.isTrackAvailable = true;
    //   this.isLoading = false;
    // });
    setTimeout(() => {
      this.tracklist = [
        {
          artist: 'John',
          title: 'Mawimba',
          imageUrl:
            'https://images.genius.com/4164dff756ddd455675789bd67fe5f1a.1000x1000x1.png',
        },
        {
          artist: 'Eminem',
          title: 'Rap God',
          imageUrl:
            'https://images.genius.com/058e2359838c93395c36119b48a2eff6.1000x1000x1.png',
        },
        {
          artist: 'Big Shaq Featuring Big Byz in da club',
          title: 'Mans Not Hot by Big Shaq and Big Boyz',
          imageUrl:
            'https://images.genius.com/fda7cc8f2cb7787981d61c15359192c0.1000x1000x1.png',
        },
        {
          artist: 'Rihanna (Ft. Drake)',
          title: 'Work',
          imageUrl:
            'https://images.genius.com/28287cc9efed5371676ff501f3ca738f.1000x1000x1.jpg',
        },
      ];
    }, 500);

    this.cardAnimation = 'in';
    this.isTrackAvailable = true;
    this.isLoading = false;
    this.chartData = [
      { label: 'Total', value: this.totalCounter },
      { label: 'Liked', value: this.likedCounter },
      { label: 'Disliked', value: this.dislikedCounter },
    ];
  }

  showNextTrack() {
    if (this.currentIndex < this.tracklist.length - 1) {
      setTimeout(() => {
        this.currentIndex++;
        this.cardAnimation = 'in';
      }, 500);
    } else {
      this.isTrackAvailable = false;
    }
  }

  liked() {
    this.cardAnimation = 'out';
    this.likedCounter++;
    this.totalCounter++;
    this.updateChartData();
    this.showNextTrack();
  }

  disliked() {
    this.cardAnimation = 'out';
    this.dislikedCounter++;
    this.totalCounter++;
    this.updateChartData();
    this.showNextTrack();
  }

  updateChartData() {
    const updatedData = [
      { label: 'Liked', value: this.likedCounter },
      { label: 'Disliked', value: this.dislikedCounter },
      { label: 'Total', value: this.totalCounter },
    ];
    this.dataSubject.next(updatedData);
  }
}
