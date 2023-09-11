import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tracks } from 'src/app/models/track.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',

  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  // @Input() tracklist: Tracks[] = [];
  @Input() artist?: string;
  @Input() title?: string;
  @Input() imageUrl?: string;

  @Output() thumbUpClicked = new EventEmitter<void>();
  @Output() thumbDownClicked = new EventEmitter<void>();

  liked() {
    this.thumbUpClicked.emit();
  }

  // Methode, um das "Thumb Down" Event auszulösen
  disliked() {
    this.thumbDownClicked.emit();
  }
}
