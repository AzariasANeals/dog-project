import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DogDto } from './create-dog.dto';
/* use -- npm run start:dev to auto use compiler while you edit*/
const mydogs = [
  { id: 1, name: 'Riley', age: 5 },
  { id: 2, name: 'Rocket', age: 6 },
  { id: 3, name: 'Pepper', age: 12 },
];

@Controller('dogs')
export class DogsController {
  dogs = mydogs;
  @Post()
  async create(@Body() createDogDto: DogDto) {
    return mydogs.push(createDogDto);
  }

  @Get()
  findAll(): any[] {
    return [
      {
        mydogs,
      },
    ];
  }

  @Get(':id')
  findOne(@Param('id') i: number) {
    return {
      mydogs: this.dogs.find((obj) => (obj.id === i ? obj : null)),
    };
  }
}
