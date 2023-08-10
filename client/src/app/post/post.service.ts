import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './../globalVariables';
import { Post } from 'src/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(userId: string) {
    return this.http.get<Post[]>(`${BASE_URL}/posts/myPosts?userId=${userId}`);
  }

  addPost(data: FormData) {
    return this.http.post(`${BASE_URL}/posts`, data);
  }

  removePost(id: string, userId: string) {
    return this.http.delete(`${BASE_URL}/posts?id=${id}&userId=${userId}`);
  }
}
