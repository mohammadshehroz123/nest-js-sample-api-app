import { Injectable } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly postService: PostService) {}
  private users: User[] = [{ id: 1, name: 'Shehroz' }];
  getUser(): string {
    return 'HELLO USER';
  }

  public async findUserById(id: number): Promise<User> {
    let user: User = { id: 0, name: 'unknown' };

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        user = this.users[i];
      }
    }

    return user;
  }

  public async findUserPost(id: number): Promise<any[]> {
    const posts = await this.postService.getUserPosts(id);
    return posts;
  }

  public isUserExist(id: number): User[] | any {
    const user = this.users.filter((user) => {
      return user.id == id;
    });

    if (user.length == 0) {
      return false;
    }
    return user;
  }
}
