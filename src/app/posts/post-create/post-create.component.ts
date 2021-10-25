import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../../post.model'
@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent{
  // Adding Dummy content to the page
  //newPost = 'No Content';
  enteredContent ='';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm){
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);

  }
}
