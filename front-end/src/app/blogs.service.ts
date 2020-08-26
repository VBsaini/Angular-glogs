import { Injectable } from '@angular/core';
import { Blogs } from './shared/blogs-interface';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';
@Injectable({
  providedIn: 'any',
})
export class BlogsService {
  constructor(private router: Router, private fetch: FetchService) {}
  blogs: Blogs[];
  getBlogs() {
    return this.fetch.get('blogs');
  }
  getUserBlog() {
    return this.fetch.get(`blogs/user`);
  }
  getUser(id) {
    return this.fetch.get(`User/${id}`);
  }
  getblog(id) {
    return this.fetch.get(`blog/${id}`);
  }
  newBlog(object) {
    this.fetch.post('new', object).subscribe((data) => {
      console.log(data);
    });
  }
  postUser(data) {
    return this.fetch.post('users', data);
  }
  isValid() {
    return this.fetch.get('isLoggedIn');
  }
  logout() {
    this.fetch.get('users/logout').subscribe((data) => {
      console.log(data);
    });
  }
  // checkUser(data) {
  //   return this.fetch.post('users/login', data);
  // }
  goToUpdate(id) {
    this.router.navigate([`/update/${id}`]);
  }
  updateBlog(id, obj) {
    this.fetch.put(`blog/${id}`, obj).subscribe((data) => {
      console.log(JSON.stringify(data));
    });
    console.log(obj);
  }
  deleteBlog(id) {
    this.fetch.delete(`blogs/${id}`).subscribe((data) => console.log(data));
  }
  selectBlog(blog: Blogs): Blogs {
    return blog;
  }
}
