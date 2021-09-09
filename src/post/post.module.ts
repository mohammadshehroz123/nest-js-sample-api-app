import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user/user.service';
//import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
