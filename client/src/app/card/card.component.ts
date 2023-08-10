import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/interfaces/post';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() image!: string;

  @Output() removePost = new EventEmitter<Post>();
}
