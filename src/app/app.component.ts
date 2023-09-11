import { Component, OnInit } from '@angular/core';
import { Tracks } from './models/track.model';
import { MusicChartsService } from './services/music-charts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private musicChartsService: MusicChartsService) {}
  tracklist: Tracks[] = [];
  isLoading = false;
  isTrackAvailable = false;
  currentIndex = 0;
  likedCounter = 0;
  dislikedCounter = 0;
  totalCounter = 0;

  ngOnInit(): void {
    this.isLoading = true;
    this.musicChartsService.getMusicCharts().subscribe((musicCharts) => {
      console.log();
      console.log(musicCharts);
      this.tracklist = musicCharts;
      this.isTrackAvailable = true;
      this.isLoading = false;
    });
  }

  showNextTrack() {
    // Zeige den nächsten Track, wenn verfügbar
    if (this.currentIndex < this.tracklist.length - 1) {
      this.currentIndex++;
      console.log('NEXT TRACK');
    } else {
      this.isTrackAvailable = false;
    }
  }

  liked() {
    this.likedCounter++;
    this.totalCounter++;
    console.log(
      'totalCounter: ' + this.totalCounter + 'liked: ' + this.likedCounter
    );
    this.showNextTrack();
  }

  disliked() {
    this.dislikedCounter++;
    this.totalCounter++;
    console.log(
      'totalCounter: ' + this.totalCounter + 'disliked: ' + this.dislikedCounter
    );
    this.showNextTrack();
  }
}
