import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: any;
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(){
    this.http.get<{message:string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return{
          title: post.title,
          content: post.content,
          id: post._id
        }
      })

    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    var id = Math.random().toString(36).slice(2);
    const post: Post = {id, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }
}
