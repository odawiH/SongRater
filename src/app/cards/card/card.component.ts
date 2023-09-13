import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',

  styleUrls: ['./card.component.scss'],
  animations: [],
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

  disliked() {
    this.thumbDownClicked.emit();
  }
}
