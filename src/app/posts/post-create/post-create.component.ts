import { Component, EventEmitter, Output} from '@angular/core';

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
  // onAddPost(postInput: HTMLTextAreaElement){
  //   //this.newPost = postInput.value;
  //   //alert("Post Added");
  //   //console.log(postInput);
  //   //console.dir(postInput);

  // }

  // onUseNgModelDeclarative(){
  //   this.newPost = this.enteredvalue;
  // }

  onAddPost(){
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);

  }
}
