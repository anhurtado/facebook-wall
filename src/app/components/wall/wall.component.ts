import { Component, OnInit } from '@angular/core';
import { WallService } from '../../services/wall.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  public postsListArray: any;
  public post: any = {};

  public titlePost: string;
  public targetPost: string;
  private idUser: string;

  constructor(
    private wallService: WallService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(item => {
      this.idUser = item.uid;
      this.getAllPost();
    });
  }

  getAllPost() {
    this.wallService.getPostsList(this.idUser).snapshotChanges().subscribe(
      data => {
        this.postsListArray = [];
        data.forEach(i => {
          let x = i.payload.toJSON();
          x["$key"] = i.key;
          this.postsListArray.push(x);
        });
        console.log(this.postsListArray)
      }, error => {
        console.log(error);
      });
  }

  newPost() {
    this.post.id = Date.now();
    this.wallService.addPost(this.post);
    this.post = {};
  }

  editPost(key: string) {
    this.post.title = prompt('Actualización de Post');
    if (this.post.title !== '') {
      this.wallService.updatePost(key, this.post);
      this.post = {};
    }
  }

  removePost(key: string) {
    if (confirm('¿Estas seguro/a de eliminar este post?')) {
      this.wallService.deletePost(key);
    }
  }

  filterPosts(filterName: string) {
    if (filterName === '') {
      this.getAllPost();
    } else {
      this.wallService.getPostsListByTarget(this.idUser, filterName).snapshotChanges().subscribe(
        data => {
        this.postsListArray = [];
        data.forEach(i => {
          let x = i.payload.toJSON();
          x["$key"] = i.key;
          this.postsListArray.push(x);
        });
      }, error => {
        console.log(error);
      });
    }
  }
}
