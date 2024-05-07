import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>

  ){
  }

  async create(createPostDto: CreatePostDto) {
    try {
      // const {images=[], ...productDetails} =createProductDto;

      // const product= this.productRepository.create(
      // {  ...productDetails,
      //  images:images.map(
      //   image=> this.productImageRepository.create({url:image})
      //   )
      // }
      //   );

     const post= await this.postRepository.save(createPostDto);
      return post;
    } catch (error) {
     this.handleDBExceptions(error);
    }
  }


  async findAll() {
 //   const {limit=10,offset=0}=paginationDto;
    const post= await this.postRepository.find({ });
    return post;
  }

  async findOne(id: string) {
    let post:Post;

    if (isUUID(id)) {
     post= await this.postRepository.findOneBy({id});
    }
    if (!post) {
       throw new NotFoundException(`Product with id ${id} not found`);
    }
    return post;
  }

 async update(id: string, updatePostDto: UpdatePostDto) {
    const post= await this.postRepository.preload({id:id,... updatePostDto});
    if (!post) {
      throw new NotFoundException(`Product with id ${id} not found`);
   }
   try {
    await this.postRepository.save(post);
    return post;
   } catch (error) {
    this.handleDBExceptions(error);
   }
  }

  async remove(id: string) {
    const post= await this.findOne(id);
    await this.postRepository.remove(post);
  }
  private handleDBExceptions(error:any){
    if (error.code==="23505") {
      throw new BadRequestException(error.detail);
    }
    // this.logger.error(error);
    throw new InternalServerErrorException("Ayuda");
  }
}

