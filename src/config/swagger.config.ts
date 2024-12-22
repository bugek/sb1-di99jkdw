import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Production Planning System')
    .setDescription(`
      API documentation for the Production Planning System.
      
      ## Features
      - Process Planning
      - Product Planning
      - Raw Materials Management
      - Reporting
      
      ## Authentication
      All endpoints require authentication using Bearer token.
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('process-planning', 'Manage production processes and scheduling')
    .addTag('product-planning', 'Handle product definitions and requirements')
    .addTag('raw-materials', 'Manage inventory and material tracking')
    .addTag('reporting', 'Generate reports and analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Production Planning API',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
}