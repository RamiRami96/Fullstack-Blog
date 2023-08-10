import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from '../global-variables';
import { Post } from 'src/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(userId: string) {
    return this.http.get<Post[]>(
      `${GlobalVariables.baseUrl}/posts/myPosts?userId=${userId}`
    );
  }

  addPost(data: FormData) {
    return this.http.post(`${GlobalVariables.baseUrl}/posts`, data);
  }

  removePost(id: string, userId: string) {
    return this.http.delete(
      `${GlobalVariables.baseUrl}/posts?id=${id}&userId=${userId}`
    );
  }
}
