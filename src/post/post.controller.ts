import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { UserService } from 'src/user/user/user.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  @Get('')
  async getPosts(): Promise<any> {
    return this.postService.getAllPosts();
  }

  @Get('by-user/:id')
  getUserPosts(@Param('id') id: string): string {
    return `Hello posts by users ${id}`;
  }

  @Post('create')
  async createPost(@Body() body: any) {
    const allowed_keys: Array<string> = [
      'id',
      'createdBy',
      'title',
      'description',
    ];
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
        this.userService.isUserExist(body.createdBy) &&
        !this.postService.postExist(body.id)
      ) {
        return await this.postService.createPost(body);
      } else {
        return JSON.stringify({
          message: 'Either user does not exist or there is typo in parameters or post with this id already exists',
        });
      }
    }
  }
}
