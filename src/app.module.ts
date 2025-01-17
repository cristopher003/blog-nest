import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type:'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    autoLoadEntities:true,
    synchronize:true
  }),
  PostsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
