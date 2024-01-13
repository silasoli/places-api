import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PlacesService } from '../services/places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserJwtGuard } from 'src/auth/guards/auth-user-jwt.guard';

@ApiTags('Places')
@Controller('places')
@UseGuards(AuthUserJwtGuard)
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiOperation({ summary: 'Create place' })
  @ApiResponse({
    status: 200,
    description: 'Place created successfully',
    // type: UserResponseDto
  })
  @ApiBody({ type: CreatePlaceDto })
  @Post()
  public create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @ApiOperation({ summary: 'List places' })
  @ApiResponse({
    status: 200,
    description: 'Place listing returned successfully',
    // type: PaginatedResponseVideosDto,
  })
  @Get()
  public findAll() {
    return this.placesService.findAll();
  }

  @ApiOperation({ summary: 'Search place by id' })
  @ApiResponse({
    status: 200,
    description: 'Place returned successfully',
    // type: VideoResponseDto,
  })
  @Get(':id([0-9]+)')
  public findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update place' })
  @ApiResponse({
    status: 200,
    description: 'Place updated successfully',
    // type: UserResponseDto
  })
  @ApiBody({ type: UpdatePlaceDto })
  @Patch(':id([0-9]+)')
  public update(@Param('id') id: string, @Body() dto: UpdatePlaceDto) {
    return this.placesService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Delete a place by id' })
  @ApiResponse({
    status: 204,
    description: 'Place deleted successfully',
  })
  @HttpCode(204)
  @Delete(':id([0-9]+)')
  public remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}
