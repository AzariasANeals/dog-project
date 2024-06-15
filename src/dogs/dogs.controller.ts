/* eslint-disable prettier/prettier */
//console.log(i);
//createDogDto.id = i[0];
//createDogDto.name = i[1];
//createDogDto.age = parseInt(i[2]);
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res
} from '@nestjs/common';
import { CreateDogDto } from './create-dog.dto';
import { UpdateDogDto } from './update-dog.dto';
import { Response } from 'express'
/* use -- npm run start:dev to auto use compiler while you edit*/

/* Here is a let array of my dogs */
let mydogs = [
  { id: '1', name: 'Riley', age: 5 },
  { id: '2', name: 'Rocket', age: 6 },
  { id: '3', name: 'Pepper', age: 12 },
  { id: '4', name: 'MaoMao', age: 3 },
];

@Controller('dogs')
export class DogsController {
  dogs = mydogs;

  /* This @Post decoartor allows me to use POST to add a new dog to my array */
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    console.log(createDogDto);
    console.log(CreateDogDto);
    this.dogs.push(createDogDto);
    return createDogDto;
  }

  // This @Get() returns all of the dogs in the mydogs array
  @Get()
  findAll(@Res() response: Response): Response {
    return response.status(200).send({data: mydogs});
  
  }

  // This @Get(':id') returns the dog with the specified id or an empty array
  // Ex: localhost:3000/dogs/2 will return the dog with id:2 if it exists
  @Get(':id')
  findOne(@Param('id') i: string, @Res() response: Response): Response {
    const dog = mydogs.filter((x) => x.id === i).map((x) => x);
    console.log(mydogs);
    console.log(dog);
    console.log(i);
    if(dog.length > 0)
      {
        return response.status(200).send({data: dog});
      }
    else
      {
        return response.status(404).send({data: 'ERROR:404: No dog with id found in database'});
      }
    
  }

  // This @Put(':id') allows us to update a dog name and age for a given id.
  @Put(':id')
  update(@Param('id') i: string, @Body() updateDogDto: UpdateDogDto) {
    console.log(i);
    console.log(updateDogDto);
    let found = false;
    this.dogs.forEach((dg) => {
      if (dg.id === i) {
        dg.age = updateDogDto.age;
        dg.name = updateDogDto.name;
        found = true;
      }
    });
    if (!found) {
      this.dogs.push(updateDogDto);
    }
    return 'This is a put.';
  }

  // This @Delete(':id') allows us to remove a dog from the array with a given id
  @Delete(':id')
  remove(@Param('id') i: string) {
    console.log(i);
    const newDogs: {
      id: string;
      name: string;
      age: number; //console.log(i);
    }[] = [];
    this.dogs.forEach((dg) => {
      if (dg.id !== i) {
        newDogs.push(dg);
      }
    });
    this.dogs = newDogs;
    mydogs = this.dogs;
    return 'This is a delete';
  }
}
