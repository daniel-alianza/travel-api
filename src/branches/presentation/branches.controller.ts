import { Controller, Get } from '@nestjs/common';
import { GetAllBranchesUseCase } from '../application/use-cases/get-all-branches.use-case';

@Controller('branches')
export class BranchesController {
  constructor(private readonly getBranches: GetAllBranchesUseCase) {}

  @Get()
  async getAllBranches() {
    const branches = await this.getBranches.execute();

    return {
      success: true,
      message: 'Sucursales obtenidas correctamente',
      data: branches,
    };
  }
}
