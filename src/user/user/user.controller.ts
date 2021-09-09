import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Post } from 'src/post/post.interface';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return this.userService.getUser();
  }

  @Get('find/:id')
  async findUserById(@Param('id') id: number): Promise<User> {
    const user: User = await this.userService.findUserById(id);
    return user;
  }

  @Get(':id/posts')
  async getUserPosts(@Param('id') id: number): Promise<any> {
    const posts = await this.userService.findUserPost(id);
    return posts;
  }

  @Post('create')
  async createUser(@Body() body: any) {
    const allowed_keys: Array<string> = ['id', 'name'];
    const body_keys: Array<string> = Object.keys(body);

    if (allowed_keys.length != body_keys.length) {
      return JSON.stringify({ message: 'insufficient parameters provided!' });
    } else {
      let count: number = 0;
      for (let i = 0; i < allowed_keys.length; i++) {
        for (let j = 0; j < body_keys.length; j++) {
          if (allowed_keys[i] == body_keys[j]) {
            count = count + 1;
          }
        }
      }

      if (
        count == allowed_keys.length &&
        !this.userService.isUserExist(body.id)
      ) {
        return await this.userService.createUser(body);
      } else {
        return JSON.stringify({
          message: 'Either user does not exist or there is typo in parameters or post with this id already exists',
        });
      }
    }
  }
}
