import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  @Input() userId!: string;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  private loadPosts() {
    this.postService
      .getPosts(this.userId)
      .pipe(
        tap((data) => {
          this.posts$.next(data);
        }),
        catchError((error) => {
          console.error(error);
          return [];
        })
      )
      .subscribe();
  }

  onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.postForm.patchValue({ image: file });
    }
  }

  addPost() {
    if (this.postForm.valid) {
      const newPost = new FormData();

      newPost.append('title', this.postForm.get('title')?.value);
      newPost.append('content', this.postForm.get('content')?.value);
      newPost.append('image', this.postForm.get('image')?.value);
      newPost.append('userId', String(this.userId));

      this.postService
        .addPost(newPost)
        .pipe(
          tap((data) => {
            this.posts$.next([...this.posts$.value, data as Post]);
            this.postForm.reset();
          }),
          catchError((error) => {
            console.error(error);
            return [];
          })
        )
        .subscribe();
    }
  }

  removePost(id: string, userId: string) {
    this.postService
      .removePost(id, userId)
      .pipe(
        tap((data) => {
          this.posts$.next(
            this.posts$.value.filter((post) => post.id !== (data as Post).id)
          );
        }),
        catchError((error) => {
          console.error(error);
          return [];
        })
      )
      .subscribe();
  }
}
