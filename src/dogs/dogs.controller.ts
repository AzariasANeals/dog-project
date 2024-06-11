import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateDogDto } from './create-dog.dto';
import { UpdateDogDto } from './update-dog.dto';
/* use -- npm run start:dev to auto use compiler while you edit*/
const mydogs = [
  { id: '1', name: 'Riley', age: 5 },
  { id: '2', name: 'Rocket', age: 6 },
  { id: '3', name: 'Pepper', age: 12 },
  { id: '4', name: 'MaoMao', age: 3 },
];

@Controller('dogs')
export class DogsController {
  dogs = mydogs;
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    //console.log(i);
    //createDogDto.id = i[0];
    //createDogDto.name = i[1];
    //createDogDto.age = parseInt(i[2]);
    console.log(createDogDto);
    console.log(CreateDogDto);
    return createDogDto;
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
  findOne(@Param('id') i: string): any[] {
    const dog = mydogs.filter((x) => x.id === i).map((x) => x);
    console.log(mydogs);
    console.log(dog);
    console.log(i);
    return dog;
  }

  @Put(':id')
  update(@Param('id') i: string, @Body() updateDogDto: UpdateDogDto) {
    console.log(i);
    console.log(updateDogDto);
    return 'This is a put.';
  }

  @Delete(':id')
  remove(@Param('id') i: string) {
    console.log(i);
    return 'This is a delete';
  }
}
