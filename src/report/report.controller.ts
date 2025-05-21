import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // -------- ADMIN REPORTS --------
  @Get('admin/all-results')
  getAllResults() {
    return this.reportService.getAllResults();
  }

  @Get('admin/summary')
  async getGlobalStats() {
    const results = await this.reportService.getAllResults();
    const total = results.length;
    const avg =
      results.reduce((sum, r) => sum + r.correctPercentage, 0) / (total || 1);
    return {
      totalExams: total,
      averageScore: parseFloat(avg.toFixed(2)),
    };
  }

  // -------- PARENT REPORTS --------
  @Get('parent/children-results')
  getChildrenResults(@Query('childIds') childIds: string[]) {
    return this.reportService.getResultsByChildIds(childIds);
  }

  @Get('parent/children-summary')
  async getChildrenSummary(@Query('childIds') childIds: string[]) {
    return this.reportService.getStatsForChildren(childIds);
  }

  // -------- CHILD REPORTS --------
  @Get('child/:userId/results')
  getResultsByUser(@Param('userId') userId: string) {
    return this.reportService.getResultsByUser(userId);
  }

  @Get('child/:userId/stats')
  async getStatsByUser(@Param('userId') userId: string) {
    return this.reportService.getStatsForUser(userId);
  }

  @Get('analyze/:userId')
  async analyzeUserResults(@Param('userId') userId: string) {
    const analysis = await this.reportService.analyzeUserResults(userId);
    return { analysis };
  }
}
