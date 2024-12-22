import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { ProcessPlanningModule } from './process-planning/process-planning.module';
import { ProductPlanningModule } from './product-planning/product-planning.module';
import { ReportingModule } from './reporting/reporting.module';
import { SharedModule } from './shared/shared.module';
import { LoggerService } from './shared/services/logger.service';
import { createMongooseOptions } from './config/database/connection.config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService, logger: LoggerService) => 
        createMongooseOptions(configService, logger),
      inject: [ConfigService, LoggerService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/', // Serve static files at root path
    }),
    RawMaterialsModule,
    ProcessPlanningModule,
    ProductPlanningModule,
    ReportingModule,
    SharedModule,
  ],
})
export class AppModule {}