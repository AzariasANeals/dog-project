import { Controller, Get, Post } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
  @Post()
  create(): string {
    return 'This action adds a new dog';
  }

  @Get()
  findAll(): any[] {
    return [{ name: 'Riley', age: 5 }];
  }
}
