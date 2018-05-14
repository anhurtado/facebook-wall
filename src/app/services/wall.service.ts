import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class WallService {
  public postsList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) {}

  getPostsList(idUser: string) {
    this.postsList = this.firebasedb.list(idUser + '/posts/');
    return this.postsList;
  }

  getPostsListByTarget(idUser: string, target: string) {
    this.postsList = this.firebasedb.list(idUser + '/posts/', ref => ref.orderByChild('target').equalTo(target));
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
