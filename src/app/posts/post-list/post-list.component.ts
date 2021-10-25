import { Component, Input} from "@angular/core";
import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit{
  // posts = [
  //   {title: 'First Post', content: 'This is the First post\'s content'},
  //   {title: 'Second Post', content: 'This is the Second post\'s content'},
  //   {title: 'Third Post', content: 'This is the Third post\'s content'},
  //   {title: 'Fourth Post', content: 'This is the Fourth post\'s content'},
  // ]

  @Input() posts: Post[] = [];


  constructor(public postsService: PostsService){}

  ngOnInit(){
    this.posts = this.postsService.getPosts();
  }

}
