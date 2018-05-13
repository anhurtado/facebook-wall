import { Component, OnInit } from '@angular/core';
import { WallService } from '../../services/wall.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  public postsListArray: any;
  public titlePost: string;
  public targetPost: string;

  constructor(private wallService: WallService) {}

  ngOnInit() {
    this.wallService.getPostsList().snapshotChanges().subscribe(item => {
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
    this.wallService.updatePost(key, prompt('Actualización'));
  }

  removePost(key: string) {
    if (confirm('¿Estas seguro/a de eliminar este post?')) {
      this.wallService.deletePost(key);
    }
  }
}
