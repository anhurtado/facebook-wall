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
    this.wallService.getPostsList(this.idUser).snapshotChanges().subscribe(item => {
      this.postsListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.postsListArray.push(x);
      });
    });
  }

  newPost() {
    this.wallService.addPost(this.titlePost, this.targetPost);
    this.titlePost = "";
  }

  editPost(key: string) {
    var newTitle = prompt('Actualización');
    if (newTitle != '') {
      this.wallService.updatePost(key, newTitle);
    }
  }

  removePost(key: string) {
    if (confirm('¿Estas seguro/a de eliminar este post?')) {
      this.wallService.deletePost(key);
    }
  }

  filterPosts(filterName: string) {
    if (filterName == '') {
      this.getAllPost();
    } else {
      this.wallService.getPostsListByTarget(this.idUser, filterName).snapshotChanges().subscribe(item => {
        this.postsListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.postsListArray.push(x);
        });
      });
    }
  }
}
