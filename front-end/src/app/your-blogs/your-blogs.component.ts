import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-your-blogs',
  templateUrl: './your-blogs.component.html',
  styleUrls: ['./your-blogs.component.css'],
})
export class YourBlogsComponent implements OnInit {
  constructor(
    public blogsService: BlogsService,
    private FlashMessagesService: FlashMessagesService
  ) {}
  blogs;
  data = [];
  ngOnInit(): void {
    this.getblogs();
  }
  getblogs() {
    this.data = [];
    this.blogsService.getUserBlog().subscribe((UserBlogs) => {
      this.data = UserBlogs.blog.blogs;
      console.log(UserBlogs.blog.blogs);
      if (this.data.length < 5) {
        this.blogs = this.data;
      } else {
        this.blogs = this.data.slice(this.startingNum, this.endingNum);
      }
    });
  }
  start = true;
  pgNum = 1;
  end = false;
  startingNum = 0;
  endingNum = 5;
  user = false;
  belong = false;
  pgIncrement() {
    this.start = false;
    this.pgNum++;
    this.startingNum = this.startingNum + 5;
    this.endingNum = this.endingNum + 5;
    this.blogsService.getBlogs().subscribe((data) => {
      console.log(data);
      if (this.endingNum >= data.length) this.end = true;
    });
    this.getblogs();
  }
  pgDecrement() {
    this.end = false;
    this.pgNum--;
    this.startingNum = this.startingNum - 5;
    this.endingNum = this.endingNum - 5;
    this.blogsService.getBlogs().subscribe((data) => {
      console.log(data);
      if (this.startingNum <= 0) this.start = true;
    });
    this.getblogs();
  }
  selectedBlog;
  isDisplaying = false;
  unSelect() {
    this.getblogs();
    this.selectedBlog;
    this.isDisplaying = false;
  }
  selectBlog(blog) {
    this.selectedBlog = blog;
    this.isDisplaying = true;
  }
  update(id) {
    this.blogsService.goToUpdate(id);
  }
  delete() {
    this.blogsService.deleteBlog(this.selectedBlog.id);
    this.FlashMessagesService.show('Delete successful', {
      cssClass: 'alert alert-success',
      timeout: 2000,
    });
    this.getblogs();
    this.selectedBlog;
    this.isDisplaying = false;
  }
}
