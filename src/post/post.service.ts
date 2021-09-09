import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user/user.service';
import { Post } from './post.interface';

@Injectable()
export class PostService {
  private readonly posts: Array<Post> = [
    {
      id: 1,
      createdBy: 1,
      title: 'InvoZone',
      description: 'A great working environment',
    },
    {
      id: 3,
      createdBy: 4,
      title: 'I@C',
      description: 'Fintech Company',
    },
    {
      id: 4,
      createdBy: 3,
      title: 'Cinnova',
      description: 'USA Based Company',
    },
  ];

  public async getAllPosts(): Promise<Post[]> {
    return this.posts;
  }

  public async getUserPosts(id: number): Promise<Post[]> {
    let posts: Post[];
    posts = this.posts.filter((post) => {
      return post.id == id;
    });
    return posts;
  }

  public async createPost(body: any): Promise<Post | undefined> {
    this.posts.push({
      id: body.id,
      title: body.title,
      description: body.description,
      createdBy: body.createdBy,
    });
    return this.posts[this.posts.length - 1];
  }

  public postExist(id: number): boolean {
    const post = this.posts.filter((post) => {
      return post.id == id;
    });

    if (post.length == 0) {
      return false;
    }
    return true;
  }
}
