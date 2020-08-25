import { Component, OnInit, Input } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Blogs } from '../shared/blogs-interface';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css'],
})
export class BlogsPageComponent implements OnInit {
  constructor(
    public BlogsService: BlogsService,
    private FlashMessagesService: FlashMessagesService
  ) {}
  isDisplaying: boolean;
  @Input()
  selectedBlog: Blogs;
  selectBlog(blog) {
    this.selectedBlog = this.BlogsService.selectBlog(blog);
    this.isDisplaying = true;
    this.checkValidity();
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
    this.BlogsService.getBlogs().subscribe((data) => {
      console.log(data);
      if (this.endingNum >= data.length) this.end = true;
    });
    this.getBlogs();
  }
  pgDecrement() {
    this.end = false;
    this.pgNum--;
    this.startingNum = this.startingNum - 5;
    this.endingNum = this.endingNum - 5;
    this.BlogsService.getBlogs().subscribe((data) => {
      console.log(data);
      if (this.startingNum <= 0) this.start = true;
    });
    this.getBlogs();
  }
  getBlogs() {
    this.BlogsService.getBlogs().subscribe((data) => {
      this.blogs = data.slice(this.startingNum, this.endingNum);
    });
  }
  checkValidity() {
    this.BlogsService.isValid().subscribe((data) => {
      if (data.user) {
        this.user = true;
        if (data.user.username == this.selectedBlog.author) {
          this.belong = true;
        } else {
          this.belong = false;
        }
      } else {
        this.user = false;
      }
    });
  }
  blogs: Blogs[] = this.BlogsService.blogs;
  unSelect() {
    this.selectedBlog;
    this.isDisplaying = false;
    this.getBlogs();
  }
  update(id) {
    this.BlogsService.goToUpdate(id);
  }
  ngOnInit(): void {
    this.getBlogs();
  }
  delete() {
    this.BlogsService.deleteBlog(this.selectedBlog.id);
    this.FlashMessagesService.show('Delete successful', {
      cssClass: 'alert alert-success',
      timeout: 2000,
    });
    this.getBlogs();
    this.selectedBlog;
    this.isDisplaying = false;
  }
}
