import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class WallService {
  public postsList: AngularFireList<any>;

  constructor(
    private firebasedb: AngularFireDatabase
  ) {}

  getPostsList() {
    this.postsList = this.firebasedb.list('mP4HMI29jLSfAlPau7Pb9AgMt7U2/posts/');
    return this.postsList;
  }

  addPost(titleN: string, targetN: string) {
    this.postsList.push({
      title: titleN,
      target: targetN
    });
  }

  updatePost($key: string, title: string) {
    this.postsList.update($key, { title: title });
  }

  deletePost($key: string) {
    this.postsList.remove($key);
  }
}
