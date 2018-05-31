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

  addPost(post: any) {
    this.postsList.push(post);
  }

  updatePost($key: string, post: any) {
    this.postsList.update($key, post);
  }

  deletePost($key: string) {
    this.postsList.remove($key);
  }
}
