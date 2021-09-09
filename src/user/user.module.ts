import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [PostModule],
  controllers: [UserController],
  providers: [UserService, PostService],
  exports: [UserModule],
})
export class UserModule {}
