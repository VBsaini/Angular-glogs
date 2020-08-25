import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// ==============================================================
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { HomeComponent } from './home/home.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { UserComponent } from './user/user.component';
import { YourBlogsComponent } from './your-blogs/your-blogs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogsPageComponent,
    HomeComponent,
    NewBlogComponent,
    UpdateBlogComponent,
    UserComponent,
    YourBlogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
