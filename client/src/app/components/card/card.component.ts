import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { GlobalVariables } from '../../global-variables';

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

  baseUrl = GlobalVariables.baseUrl;
}
