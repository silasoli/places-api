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
  Query,
} from '@nestjs/common';
import { PlacesService } from '../services/places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserJwtGuard } from 'src/auth/guards/auth-user-jwt.guard';
import { IDQueryDTO } from '../dto/id-query.dto';
import { PlaceResponseDto } from '../dto/place-response.dto';
import { PlaceQueryDto } from '../dto/place-query.dto';

@ApiBearerAuth()
@ApiTags('Places')
@Controller('places')
@UseGuards(AuthUserJwtGuard)
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiOperation({ summary: 'Create place' })
  @ApiResponse({
    status: 201,
    description: 'Place created successfully',
    type: PlaceResponseDto,
  })
  @ApiBody({ type: CreatePlaceDto })
  @Post()
  public create(
    @Body() createPlaceDto: CreatePlaceDto,
  ): Promise<PlaceResponseDto> {
    return this.placesService.create(createPlaceDto);
  }

  @ApiOperation({ summary: 'List places' })
  @ApiResponse({
    status: 200,
    description: 'Place listing returned successfully',
    type: [PlaceResponseDto],
  })
  @Get()
  public findAll(@Query() query: PlaceQueryDto): Promise<PlaceResponseDto[]> {
    return this.placesService.findAll(query);
  }

  @ApiOperation({ summary: 'Search place by id' })
  @ApiResponse({
    status: 200,
    description: 'Place returned successfully',
    type: PlaceResponseDto,
  })
  @Get(':id([0-9]+)')
  public findOne(@Param() data: IDQueryDTO): Promise<PlaceResponseDto> {
    return this.placesService.findOne(data.id);
  }

  @ApiOperation({ summary: 'Update place' })
  @ApiResponse({
    status: 200,
    description: 'Place updated successfully',
    type: PlaceResponseDto
  })
  @ApiBody({ type: UpdatePlaceDto })
  @Patch(':id([0-9]+)')
  public update(
    @Param() data: IDQueryDTO,
    @Body() dto: UpdatePlaceDto,
  ): Promise<PlaceResponseDto> {
    return this.placesService.update(data.id, dto);
  }

  @ApiOperation({ summary: 'Delete a place by id' })
  @ApiResponse({
    status: 204,
    description: 'Place deleted successfully',
  })
  @HttpCode(204)
  @Delete(':id([0-9]+)')
  public remove(@Param() data: IDQueryDTO): Promise<void> {
    return this.placesService.remove(data.id);
  }
}
