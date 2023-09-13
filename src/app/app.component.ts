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
    this.musicChartsService.getMusicCharts().subscribe((musicCharts) => {
      this.tracklist = musicCharts;
      this.isTrackAvailable = true;
      this.isLoading = false;
    });

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
