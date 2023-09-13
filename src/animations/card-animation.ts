import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const cardAnimation = trigger('voted', [
  state('in', style({ opacity: 1, transform: 'scale(1.05)' })),
  state('out', style({ opacity: 0, transform: 'scale(1)' })),
  transition('* => *', [animate('500ms')]),
]);
