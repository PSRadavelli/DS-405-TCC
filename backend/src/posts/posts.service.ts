import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostModel } from './posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];
  public findAll(): Array<PostModel> {
    return this.posts;
  }
  public findOne(id: number): PostModel {
    const post: PostModel = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }
  public create(post: PostModel): PostModel {
    // if the title is already in use by another post
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    // find the next id for a new blog post
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.posts.push(blogPost);

    return blogPost;
  }
  public delete(id: number): void {
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    this.posts.splice(index, 1);
  }
  public update(id: number, post: PostModel): PostModel {
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    // if the title is already in use by another post
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title && item.id !== id,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.posts[index] = blogPost;

    return blogPost;
  }
}
