import { Injectable } from '@nestjs/common';
import { Product } from '../schemas/product.schema';
import { ProductAiService } from './product-ai.service';

@Injectable()
export class ProductDemandService {
  constructor(private readonly productAiService: ProductAiService) {}

  async predictDemand(products: Product[]): Promise<any> {
    return this.productAiService.predictDemand(products);
  }

  async calculateHistoricalDemand(products: Product[]): Promise<any> {
    // Implementation for historical demand calculation
    return {
      historicalData: products.map(product => ({
        productId: product.id,
        averageDemand: 0,
        peakDemand: 0,
        seasonalityFactors: [],
      })),
    };
  }

  async analyzeDemandTrends(products: Product[]): Promise<any> {
    // Implementation for demand trend analysis
    return {
      trends: products.map(product => ({
        productId: product.id,
        trend: 'stable',
        confidence: Math.random(),
      })),
    };
  }
}