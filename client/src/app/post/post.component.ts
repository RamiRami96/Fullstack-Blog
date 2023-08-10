import { Component, Input, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  posts!: Post[];
  @Input() userId!: string;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: [null, [Validators.required]],
      userId: [this.userId, [Validators.required]],
    });
  }

  ngOnInit() {
    this.postService.getPosts(this.userId).subscribe({
      complete: console.info,
      next: (data) => {
        this.posts = data;
      },
      error: console.error,
    });
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

      this.postService.addPost(newPost).subscribe({
        complete: console.info,
        next: (data) => (this.posts = [...this.posts, data as Post]),
        error: console.error,
      });
    }
  }

  removePost(id: string, userId: string) {
    this.postService.removePost(id, userId).subscribe({
      complete: console.info,
      next: (data) =>
        (this.posts = this.posts.filter(
          (post) => post.id !== (data as Post).id
        )),
      error: console.error,
    });
  }
}
