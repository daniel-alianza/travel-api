import { Controller, Get } from '@nestjs/common';
import { GetAllAreasUseCase } from '../application/use-cases/get-all-areas.use-case';

@Controller('areas')
export class AreaController {
  constructor(private readonly getAreas: GetAllAreasUseCase) {}

  @Get()
  async getAllAreas() {
    const areas = await this.getAreas.execute();

    return {
      success: true,
      message: 'Áreas obtenidas correctamente',
      data: areas,
    };
  }
}
