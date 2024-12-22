/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const path_1 = __webpack_require__(/*! path */ "path");
const raw_materials_module_1 = __webpack_require__(/*! ./raw-materials/raw-materials.module */ "./src/raw-materials/raw-materials.module.ts");
const process_planning_module_1 = __webpack_require__(/*! ./process-planning/process-planning.module */ "./src/process-planning/process-planning.module.ts");
const product_planning_module_1 = __webpack_require__(/*! ./product-planning/product-planning.module */ "./src/product-planning/product-planning.module.ts");
const reporting_module_1 = __webpack_require__(/*! ./reporting/reporting.module */ "./src/reporting/reporting.module.ts");
const shared_module_1 = __webpack_require__(/*! ./shared/shared.module */ "./src/shared/shared.module.ts");
const logger_service_1 = __webpack_require__(/*! ./shared/services/logger.service */ "./src/shared/services/logger.service.ts");
const connection_config_1 = __webpack_require__(/*! ./config/database/connection.config */ "./src/config/database/connection.config.ts");
const app_config_1 = __webpack_require__(/*! ./config/app.config */ "./src/config/app.config.ts");
const database_config_1 = __webpack_require__(/*! ./config/database.config */ "./src/config/database.config.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, database_config_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService, logger) => (0, connection_config_1.createMongooseOptions)(configService, logger),
                inject: [config_1.ConfigService, logger_service_1.LoggerService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/',
            }),
            raw_materials_module_1.RawMaterialsModule,
            process_planning_module_1.ProcessPlanningModule,
            product_planning_module_1.ProductPlanningModule,
            reporting_module_1.ReportingModule,
            shared_module_1.SharedModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./src/config/app.config.ts":
/*!**********************************!*\
  !*** ./src/config/app.config.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    environment: process.env.NODE_ENV || 'development',
}));


/***/ }),

/***/ "./src/config/database.config.ts":
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('database', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost/production-planning',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
}));


/***/ }),

/***/ "./src/config/database/connection.config.ts":
/*!**************************************************!*\
  !*** ./src/config/database/connection.config.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMongooseOptions = void 0;
const createMongooseOptions = (configService, logger) => ({
    uri: configService.get('database.uri'),
    connectionFactory: (connection) => {
        connection.on('connected', () => {
            logger.log('✅ MongoDB connected successfully', 'DatabaseConnection');
        });
        connection.on('error', (error) => {
            logger.error('❌ MongoDB connection error:', error.message, 'DatabaseConnection');
        });
        return connection;
    },
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    retryReads: true,
});
exports.createMongooseOptions = createMongooseOptions;


/***/ }),

/***/ "./src/config/swagger.config.ts":
/*!**************************************!*\
  !*** ./src/config/swagger.config.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = setupSwagger;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
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


/***/ }),

/***/ "./src/process-planning/constants/process.constants.ts":
/*!*************************************************************!*\
  !*** ./src/process-planning/constants/process.constants.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PROCESS_CONSTANTS = void 0;
exports.PROCESS_CONSTANTS = {
    STATUS: {
        PENDING: 'pending',
        IN_PROGRESS: 'in-progress',
        COMPLETED: 'completed',
    },
    MIN_DURATION: 0,
    MAX_DURATION: 365,
};


/***/ }),

/***/ "./src/process-planning/dto/create-process.dto.ts":
/*!********************************************************!*\
  !*** ./src/process-planning/dto/create-process.dto.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProcessDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const process_constants_1 = __webpack_require__(/*! ../constants/process.constants */ "./src/process-planning/constants/process.constants.ts");
class CreateProcessDto {
}
exports.CreateProcessDto = CreateProcessDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProcessDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProcessDto.prototype, "requiredResources", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProcessDto.prototype, "dependencies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['pending', 'in-progress', 'completed'],
        required: false,
    }),
    (0, class_validator_1.IsEnum)(['pending', 'in-progress', 'completed']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof process_constants_1.ProcessStatusType !== "undefined" && process_constants_1.ProcessStatusType) === "function" ? _a : Object)
], CreateProcessDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateProcessDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CreateProcessDto.prototype, "completionDate", void 0);


/***/ }),

/***/ "./src/process-planning/dto/update-process.dto.ts":
/*!********************************************************!*\
  !*** ./src/process-planning/dto/update-process.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProcessDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_process_dto_1 = __webpack_require__(/*! ./create-process.dto */ "./src/process-planning/dto/create-process.dto.ts");
class UpdateProcessDto extends (0, swagger_1.PartialType)(create_process_dto_1.CreateProcessDto) {
}
exports.UpdateProcessDto = UpdateProcessDto;


/***/ }),

/***/ "./src/process-planning/process-planning.controller.ts":
/*!*************************************************************!*\
  !*** ./src/process-planning/process-planning.controller.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessPlanningController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const process_planning_service_1 = __webpack_require__(/*! ./process-planning.service */ "./src/process-planning/process-planning.service.ts");
const create_process_dto_1 = __webpack_require__(/*! ./dto/create-process.dto */ "./src/process-planning/dto/create-process.dto.ts");
const update_process_dto_1 = __webpack_require__(/*! ./dto/update-process.dto */ "./src/process-planning/dto/update-process.dto.ts");
let ProcessPlanningController = class ProcessPlanningController {
    constructor(processPlanningService) {
        this.processPlanningService = processPlanningService;
    }
    create(createProcessDto) {
        return this.processPlanningService.create(createProcessDto);
    }
    findAll() {
        return this.processPlanningService.findAll();
    }
    findOne(id) {
        return this.processPlanningService.findOne(id);
    }
    update(id, updateProcessDto) {
        return this.processPlanningService.update(id, updateProcessDto);
    }
    remove(id) {
        return this.processPlanningService.remove(id);
    }
    optimizeSchedule() {
        return this.processPlanningService.optimizeSchedule();
    }
    detectAnomalies(id) {
        return this.processPlanningService.detectAnomalies(id);
    }
};
exports.ProcessPlanningController = ProcessPlanningController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new process' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_process_dto_1.CreateProcessDto !== "undefined" && create_process_dto_1.CreateProcessDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProcessPlanningController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all processes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProcessPlanningController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a process by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProcessPlanningController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a process' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_process_dto_1.UpdateProcessDto !== "undefined" && update_process_dto_1.UpdateProcessDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProcessPlanningController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a process' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProcessPlanningController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('ai/optimize-schedule'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimize process schedule using AI/ML' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProcessPlanningController.prototype, "optimizeSchedule", null);
__decorate([
    (0, common_1.Get)(':id/ai/detect-anomalies'),
    (0, swagger_1.ApiOperation)({ summary: 'Detect anomalies in process using AI/ML' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProcessPlanningController.prototype, "detectAnomalies", null);
exports.ProcessPlanningController = ProcessPlanningController = __decorate([
    (0, swagger_1.ApiTags)('process-planning'),
    (0, common_1.Controller)('process-planning'),
    __metadata("design:paramtypes", [typeof (_a = typeof process_planning_service_1.ProcessPlanningService !== "undefined" && process_planning_service_1.ProcessPlanningService) === "function" ? _a : Object])
], ProcessPlanningController);


/***/ }),

/***/ "./src/process-planning/process-planning.module.ts":
/*!*********************************************************!*\
  !*** ./src/process-planning/process-planning.module.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessPlanningModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const process_planning_controller_1 = __webpack_require__(/*! ./process-planning.controller */ "./src/process-planning/process-planning.controller.ts");
const process_planning_service_1 = __webpack_require__(/*! ./services/process-planning.service */ "./src/process-planning/services/process-planning.service.ts");
const process_repository_1 = __webpack_require__(/*! ./repositories/process.repository */ "./src/process-planning/repositories/process.repository.ts");
const process_validator_1 = __webpack_require__(/*! ./validators/process.validator */ "./src/process-planning/validators/process.validator.ts");
const process_ai_service_1 = __webpack_require__(/*! ./services/process-ai.service */ "./src/process-planning/services/process-ai.service.ts");
const process_scheduling_service_1 = __webpack_require__(/*! ./services/process-scheduling.service */ "./src/process-planning/services/process-scheduling.service.ts");
const process_monitoring_service_1 = __webpack_require__(/*! ./services/process-monitoring.service */ "./src/process-planning/services/process-monitoring.service.ts");
const process_schema_1 = __webpack_require__(/*! ./schemas/process.schema */ "./src/process-planning/schemas/process.schema.ts");
const shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/shared/shared.module.ts");
let ProcessPlanningModule = class ProcessPlanningModule {
};
exports.ProcessPlanningModule = ProcessPlanningModule;
exports.ProcessPlanningModule = ProcessPlanningModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: process_schema_1.Process.name, schema: process_schema_1.ProcessSchema },
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [process_planning_controller_1.ProcessPlanningController],
        providers: [
            process_planning_service_1.ProcessPlanningService,
            process_repository_1.ProcessRepository,
            process_validator_1.ProcessValidator,
            process_ai_service_1.ProcessAiService,
            process_scheduling_service_1.ProcessSchedulingService,
            process_monitoring_service_1.ProcessMonitoringService,
        ],
        exports: [process_planning_service_1.ProcessPlanningService],
    })
], ProcessPlanningModule);


/***/ }),

/***/ "./src/process-planning/process-planning.service.ts":
/*!**********************************************************!*\
  !*** ./src/process-planning/process-planning.service.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessPlanningService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const process_schema_1 = __webpack_require__(/*! ./schemas/process.schema */ "./src/process-planning/schemas/process.schema.ts");
const process_ai_service_1 = __webpack_require__(/*! ./services/process-ai.service */ "./src/process-planning/services/process-ai.service.ts");
const error_utils_1 = __webpack_require__(/*! @shared/utils/error.utils */ "./src/shared/utils/error.utils.ts");
let ProcessPlanningService = class ProcessPlanningService {
    constructor(processModel, processAiService) {
        this.processModel = processModel;
        this.processAiService = processAiService;
    }
    async create(createProcessDto) {
        const createdProcess = new this.processModel(createProcessDto);
        return createdProcess.save();
    }
    async findAll() {
        return this.processModel.find().exec();
    }
    async findOne(id) {
        const process = await this.processModel.findById(id).exec();
        return (0, error_utils_1.throwIfNotFound)(process, 'Process', id);
    }
    async update(id, updateProcessDto) {
        const updatedProcess = await this.processModel
            .findByIdAndUpdate(id, updateProcessDto, { new: true })
            .exec();
        return (0, error_utils_1.throwIfNotFound)(updatedProcess, 'Process', id);
    }
    async remove(id) {
        const deletedProcess = await this.processModel.findByIdAndDelete(id).exec();
        return (0, error_utils_1.throwIfNotFound)(deletedProcess, 'Process', id);
    }
    async optimizeSchedule() {
        const processes = await this.findAll();
        return this.processAiService.optimizeSchedule(processes);
    }
    async detectAnomalies(id) {
        const process = await this.findOne(id);
        return this.processAiService.detectAnomalies(process);
    }
};
exports.ProcessPlanningService = ProcessPlanningService;
exports.ProcessPlanningService = ProcessPlanningService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(process_schema_1.Process.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof process_ai_service_1.ProcessAiService !== "undefined" && process_ai_service_1.ProcessAiService) === "function" ? _b : Object])
], ProcessPlanningService);


/***/ }),

/***/ "./src/process-planning/repositories/process.repository.ts":
/*!*****************************************************************!*\
  !*** ./src/process-planning/repositories/process.repository.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const process_schema_1 = __webpack_require__(/*! ../schemas/process.schema */ "./src/process-planning/schemas/process.schema.ts");
let ProcessRepository = class ProcessRepository {
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        const entity = new this.model(dto);
        return entity.save();
    }
    async findAll() {
        return this.model.find().exec();
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async update(id, dto) {
        return this.model
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
};
exports.ProcessRepository = ProcessRepository;
exports.ProcessRepository = ProcessRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(process_schema_1.Process.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProcessRepository);


/***/ }),

/***/ "./src/process-planning/schemas/process.schema.ts":
/*!********************************************************!*\
  !*** ./src/process-planning/schemas/process.schema.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessSchema = exports.Process = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const process_constants_1 = __webpack_require__(/*! ../constants/process.constants */ "./src/process-planning/constants/process.constants.ts");
let Process = class Process extends mongoose_2.Document {
};
exports.Process = Process;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Process.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Process.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Process.prototype, "requiredResources", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Process.prototype, "dependencies", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }),
    __metadata("design:type", typeof (_a = typeof process_constants_1.ProcessStatusType !== "undefined" && process_constants_1.ProcessStatusType) === "function" ? _a : Object)
], Process.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Process.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Process.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Process.prototype, "completionDate", void 0);
exports.Process = Process = __decorate([
    (0, mongoose_1.Schema)()
], Process);
exports.ProcessSchema = mongoose_1.SchemaFactory.createForClass(Process);


/***/ }),

/***/ "./src/process-planning/services/process-ai.service.ts":
/*!*************************************************************!*\
  !*** ./src/process-planning/services/process-ai.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessAiService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ProcessAiService = class ProcessAiService {
    async optimizeSchedule(processes) {
        return {
            optimizedSchedule: processes.map(process => ({
                processId: process.id,
                recommendedStartDate: new Date(),
                estimatedCompletionDate: new Date(Date.now() + process.duration * 24 * 60 * 60 * 1000),
                confidence: Math.random(),
            })),
        };
    }
    async detectAnomalies(process) {
        return {
            processId: process.id,
            anomalies: [],
            riskScore: Math.random(),
            recommendations: [
                'No anomalies detected in the current process execution',
            ],
        };
    }
};
exports.ProcessAiService = ProcessAiService;
exports.ProcessAiService = ProcessAiService = __decorate([
    (0, common_1.Injectable)()
], ProcessAiService);


/***/ }),

/***/ "./src/process-planning/services/process-monitoring.service.ts":
/*!*********************************************************************!*\
  !*** ./src/process-planning/services/process-monitoring.service.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessMonitoringService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const process_constants_1 = __webpack_require__(/*! ../constants/process.constants */ "./src/process-planning/constants/process.constants.ts");
let ProcessMonitoringService = class ProcessMonitoringService {
    calculateProgress(process) {
        if (process.status === process_constants_1.PROCESS_CONSTANTS.STATUS.COMPLETED) {
            return 100;
        }
        if (process.status === process_constants_1.PROCESS_CONSTANTS.STATUS.PENDING) {
            return 0;
        }
        const startDate = process.startDate || new Date();
        const currentDate = new Date();
        const elapsedDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        return Math.min(Math.floor((elapsedDays / process.duration) * 100), 100);
    }
    checkResourceAvailability(process) {
        return true;
    }
    getProcessMetrics(process) {
        return {
            progress: this.calculateProgress(process),
            resourcesAvailable: this.checkResourceAvailability(process),
            status: process.status,
            duration: process.duration,
        };
    }
};
exports.ProcessMonitoringService = ProcessMonitoringService;
exports.ProcessMonitoringService = ProcessMonitoringService = __decorate([
    (0, common_1.Injectable)()
], ProcessMonitoringService);


/***/ }),

/***/ "./src/process-planning/services/process-planning.service.ts":
/*!*******************************************************************!*\
  !*** ./src/process-planning/services/process-planning.service.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessPlanningService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const process_repository_1 = __webpack_require__(/*! ../repositories/process.repository */ "./src/process-planning/repositories/process.repository.ts");
const process_validator_1 = __webpack_require__(/*! ../validators/process.validator */ "./src/process-planning/validators/process.validator.ts");
const process_ai_service_1 = __webpack_require__(/*! ./process-ai.service */ "./src/process-planning/services/process-ai.service.ts");
const process_scheduling_service_1 = __webpack_require__(/*! ./process-scheduling.service */ "./src/process-planning/services/process-scheduling.service.ts");
const process_monitoring_service_1 = __webpack_require__(/*! ./process-monitoring.service */ "./src/process-planning/services/process-monitoring.service.ts");
const error_utils_1 = __webpack_require__(/*! @shared/utils/error.utils */ "./src/shared/utils/error.utils.ts");
let ProcessPlanningService = class ProcessPlanningService {
    constructor(repository, validator, aiService, schedulingService, monitoringService) {
        this.repository = repository;
        this.validator = validator;
        this.aiService = aiService;
        this.schedulingService = schedulingService;
        this.monitoringService = monitoringService;
    }
    async create(dto) {
        this.validator.validateCreate(dto);
        const process = await this.repository.create(dto);
        return (0, error_utils_1.throwIfNotFound)(process, 'Process', 'new');
    }
    async findAll() {
        const processes = await this.repository.findAll();
        return processes || [];
    }
    async findOne(id) {
        const process = await this.repository.findById(id);
        return (0, error_utils_1.throwIfNotFound)(process, 'Process', id);
    }
    async update(id, dto) {
        this.validator.validateUpdate(dto);
        const process = await this.repository.update(id, dto);
        return (0, error_utils_1.throwIfNotFound)(process, 'Process', id);
    }
    async remove(id) {
        const process = await this.repository.delete(id);
        return (0, error_utils_1.throwIfNotFound)(process, 'Process', id);
    }
    async getProcessSchedule(id) {
        const process = await this.findOne(id);
        return this.schedulingService.calculateProcessSchedule(process);
    }
    async getProcessMetrics(id) {
        const process = await this.findOne(id);
        return this.monitoringService.getProcessMetrics(process);
    }
    async optimizeSchedule() {
        const processes = await this.findAll();
        (0, error_utils_1.throwIfInvalid)(processes.length > 0, 'No processes available for optimization');
        return this.aiService.optimizeSchedule(processes);
    }
    async detectAnomalies(id) {
        const process = await this.findOne(id);
        return this.aiService.detectAnomalies(process);
    }
};
exports.ProcessPlanningService = ProcessPlanningService;
exports.ProcessPlanningService = ProcessPlanningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof process_repository_1.ProcessRepository !== "undefined" && process_repository_1.ProcessRepository) === "function" ? _a : Object, typeof (_b = typeof process_validator_1.ProcessValidator !== "undefined" && process_validator_1.ProcessValidator) === "function" ? _b : Object, typeof (_c = typeof process_ai_service_1.ProcessAiService !== "undefined" && process_ai_service_1.ProcessAiService) === "function" ? _c : Object, typeof (_d = typeof process_scheduling_service_1.ProcessSchedulingService !== "undefined" && process_scheduling_service_1.ProcessSchedulingService) === "function" ? _d : Object, typeof (_e = typeof process_monitoring_service_1.ProcessMonitoringService !== "undefined" && process_monitoring_service_1.ProcessMonitoringService) === "function" ? _e : Object])
], ProcessPlanningService);


/***/ }),

/***/ "./src/process-planning/services/process-scheduling.service.ts":
/*!*********************************************************************!*\
  !*** ./src/process-planning/services/process-scheduling.service.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessSchedulingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const date_service_1 = __webpack_require__(/*! @shared/services/date.service */ "./src/shared/services/date.service.ts");
let ProcessSchedulingService = class ProcessSchedulingService {
    constructor(dateService) {
        this.dateService = dateService;
    }
    calculateProcessSchedule(process) {
        const startDate = process.startDate || this.dateService.getCurrentDate();
        const endDate = this.dateService.addDays(startDate, process.duration);
        return {
            processId: process.id,
            startDate,
            endDate,
            duration: process.duration,
            status: process.status,
        };
    }
    generateTimeline(processes) {
        return processes.map(process => ({
            ...this.calculateProcessSchedule(process),
            dependencies: process.dependencies,
            requiredResources: process.requiredResources,
        }));
    }
};
exports.ProcessSchedulingService = ProcessSchedulingService;
exports.ProcessSchedulingService = ProcessSchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof date_service_1.DateService !== "undefined" && date_service_1.DateService) === "function" ? _a : Object])
], ProcessSchedulingService);


/***/ }),

/***/ "./src/process-planning/validators/process.validator.ts":
/*!**************************************************************!*\
  !*** ./src/process-planning/validators/process.validator.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessValidator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const process_constants_1 = __webpack_require__(/*! ../constants/process.constants */ "./src/process-planning/constants/process.constants.ts");
let ProcessValidator = class ProcessValidator {
    validateCreate(dto) {
        this.validateDuration(dto.duration);
        this.validateResources(dto.requiredResources);
        if (dto.status) {
            this.validateStatus(dto.status);
        }
    }
    validateUpdate(dto) {
        if (dto.duration !== undefined) {
            this.validateDuration(dto.duration);
        }
        if (dto.requiredResources) {
            this.validateResources(dto.requiredResources);
        }
        if (dto.status) {
            this.validateStatus(dto.status);
        }
    }
    validateDuration(duration) {
        if (duration < process_constants_1.PROCESS_CONSTANTS.MIN_DURATION ||
            duration > process_constants_1.PROCESS_CONSTANTS.MAX_DURATION) {
            throw new common_1.BadRequestException(`Duration must be between ${process_constants_1.PROCESS_CONSTANTS.MIN_DURATION} and ${process_constants_1.PROCESS_CONSTANTS.MAX_DURATION} days`);
        }
    }
    validateResources(resources) {
        if (!resources?.length) {
            throw new common_1.BadRequestException('At least one required resource must be specified');
        }
    }
    validateStatus(status) {
        const validStatuses = Object.values(process_constants_1.PROCESS_CONSTANTS.STATUS);
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid process status. Must be one of: ${validStatuses.join(', ')}`);
        }
    }
};
exports.ProcessValidator = ProcessValidator;
exports.ProcessValidator = ProcessValidator = __decorate([
    (0, common_1.Injectable)()
], ProcessValidator);


/***/ }),

/***/ "./src/product-planning/constants/product.constants.ts":
/*!*************************************************************!*\
  !*** ./src/product-planning/constants/product.constants.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCT_CONSTANTS = void 0;
exports.PRODUCT_CONSTANTS = {
    STATUS: {
        PLANNED: 'planned',
        IN_PROGRESS: 'in-progress',
        COMPLETED: 'completed',
    },
    MIN_QUANTITY: 1,
    MIN_PRIORITY: 1,
    MAX_PRIORITY: 10,
};


/***/ }),

/***/ "./src/product-planning/dto/create-product.dto.ts":
/*!********************************************************!*\
  !*** ./src/product-planning/dto/create-product.dto.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const product_constants_1 = __webpack_require__(/*! ../constants/product.constants */ "./src/product-planning/constants/product.constants.ts");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateProductDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "requiredMaterials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "processes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Object.values(product_constants_1.PRODUCT_CONSTANTS.STATUS), required: false }),
    (0, class_validator_1.IsEnum)(product_constants_1.PRODUCT_CONSTANTS.STATUS),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof product_constants_1.ProductStatus !== "undefined" && product_constants_1.ProductStatus) === "function" ? _b : Object)
], CreateProductDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "priority", void 0);


/***/ }),

/***/ "./src/product-planning/dto/update-product.dto.ts":
/*!********************************************************!*\
  !*** ./src/product-planning/dto/update-product.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_product_dto_1 = __webpack_require__(/*! ./create-product.dto */ "./src/product-planning/dto/create-product.dto.ts");
class UpdateProductDto extends (0, swagger_1.PartialType)(create_product_dto_1.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;


/***/ }),

/***/ "./src/product-planning/product-planning.controller.ts":
/*!*************************************************************!*\
  !*** ./src/product-planning/product-planning.controller.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductPlanningController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const product_planning_service_1 = __webpack_require__(/*! ./services/product-planning.service */ "./src/product-planning/services/product-planning.service.ts");
const create_product_dto_1 = __webpack_require__(/*! ./dto/create-product.dto */ "./src/product-planning/dto/create-product.dto.ts");
const update_product_dto_1 = __webpack_require__(/*! ./dto/update-product.dto */ "./src/product-planning/dto/update-product.dto.ts");
const product_schema_1 = __webpack_require__(/*! ./schemas/product.schema */ "./src/product-planning/schemas/product.schema.ts");
let ProductPlanningController = class ProductPlanningController {
    constructor(productPlanningService) {
        this.productPlanningService = productPlanningService;
    }
    create(createProductDto) {
        return this.productPlanningService.create(createProductDto);
    }
    findAll() {
        return this.productPlanningService.findAll();
    }
    async findOne(id) {
        try {
            return await this.productPlanningService.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
    }
    update(id, updateProductDto) {
        return this.productPlanningService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productPlanningService.remove(id);
    }
    predictDemand() {
        return this.productPlanningService.predictDemand();
    }
    optimizeProduction(id) {
        return this.productPlanningService.optimizeProduction(id);
    }
};
exports.ProductPlanningController = ProductPlanningController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created successfully', type: product_schema_1.Product }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProductPlanningController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all products', type: [product_schema_1.Product] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProductPlanningController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product found', type: product_schema_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductPlanningController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully', type: product_schema_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProductPlanningController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully', type: product_schema_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductPlanningController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('ai/predict-demand'),
    (0, swagger_1.ApiOperation)({ summary: 'Predict product demand using AI/ML' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Demand prediction generated successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPlanningController.prototype, "predictDemand", null);
__decorate([
    (0, common_1.Get)(':id/ai/optimize-production'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimize production using AI/ML' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Production optimization generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPlanningController.prototype, "optimizeProduction", null);
exports.ProductPlanningController = ProductPlanningController = __decorate([
    (0, swagger_1.ApiTags)('product-planning'),
    (0, common_1.Controller)('product-planning'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_planning_service_1.ProductPlanningService !== "undefined" && product_planning_service_1.ProductPlanningService) === "function" ? _a : Object])
], ProductPlanningController);


/***/ }),

/***/ "./src/product-planning/product-planning.module.ts":
/*!*********************************************************!*\
  !*** ./src/product-planning/product-planning.module.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductPlanningModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const product_planning_controller_1 = __webpack_require__(/*! ./product-planning.controller */ "./src/product-planning/product-planning.controller.ts");
const product_planning_service_1 = __webpack_require__(/*! ./services/product-planning.service */ "./src/product-planning/services/product-planning.service.ts");
const product_ai_service_1 = __webpack_require__(/*! ./services/product-ai.service */ "./src/product-planning/services/product-ai.service.ts");
const product_validation_service_1 = __webpack_require__(/*! ./services/product-validation.service */ "./src/product-planning/services/product-validation.service.ts");
const product_demand_service_1 = __webpack_require__(/*! ./services/product-demand.service */ "./src/product-planning/services/product-demand.service.ts");
const product_optimization_service_1 = __webpack_require__(/*! ./services/product-optimization.service */ "./src/product-planning/services/product-optimization.service.ts");
const product_scheduling_service_1 = __webpack_require__(/*! ./services/product-scheduling.service */ "./src/product-planning/services/product-scheduling.service.ts");
const product_repository_1 = __webpack_require__(/*! ./repositories/product.repository */ "./src/product-planning/repositories/product.repository.ts");
const product_schema_1 = __webpack_require__(/*! ./schemas/product.schema */ "./src/product-planning/schemas/product.schema.ts");
const shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/shared/shared.module.ts");
let ProductPlanningModule = class ProductPlanningModule {
};
exports.ProductPlanningModule = ProductPlanningModule;
exports.ProductPlanningModule = ProductPlanningModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [product_planning_controller_1.ProductPlanningController],
        providers: [
            product_planning_service_1.ProductPlanningService,
            product_ai_service_1.ProductAiService,
            product_validation_service_1.ProductValidationService,
            product_demand_service_1.ProductDemandService,
            product_optimization_service_1.ProductOptimizationService,
            product_scheduling_service_1.ProductSchedulingService,
            product_repository_1.ProductRepository,
        ],
        exports: [product_planning_service_1.ProductPlanningService],
    })
], ProductPlanningModule);


/***/ }),

/***/ "./src/product-planning/repositories/product.repository.ts":
/*!*****************************************************************!*\
  !*** ./src/product-planning/repositories/product.repository.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const product_schema_1 = __webpack_require__(/*! ../schemas/product.schema */ "./src/product-planning/schemas/product.schema.ts");
let ProductRepository = class ProductRepository {
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        const entity = new this.model(dto);
        return entity.save();
    }
    async findAll() {
        return this.model
            .find()
            .populate('requiredMaterials')
            .populate('processes')
            .exec();
    }
    async findById(id) {
        return this.model
            .findById(id)
            .populate('requiredMaterials')
            .populate('processes')
            .exec();
    }
    async update(id, dto) {
        const updatedProduct = await this.model
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('requiredMaterials')
            .populate('processes')
            .exec();
        if (!updatedProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedProduct;
    }
    async delete(id) {
        const deletedProduct = await this.model.findByIdAndDelete(id).exec();
        if (!deletedProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return deletedProduct;
    }
    async findByMaterialId(materialId) {
        return this.model
            .find({ requiredMaterials: materialId })
            .populate('requiredMaterials')
            .populate('processes')
            .exec();
    }
    async findByProcessId(processId) {
        return this.model
            .find({ processes: processId })
            .populate('requiredMaterials')
            .populate('processes')
            .exec();
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProductRepository);


/***/ }),

/***/ "./src/product-planning/schemas/product.schema.ts":
/*!********************************************************!*\
  !*** ./src/product-planning/schemas/product.schema.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const product_constants_1 = __webpack_require__(/*! ../constants/product.constants */ "./src/product-planning/constants/product.constants.ts");
let Product = class Product extends mongoose_2.Document {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Product.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'RawMaterial' }] }),
    __metadata("design:type", Array)
], Product.prototype, "requiredMaterials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Process' }] }),
    __metadata("design:type", Array)
], Product.prototype, "processes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(product_constants_1.PRODUCT_CONSTANTS.STATUS),
        default: product_constants_1.PRODUCT_CONSTANTS.STATUS.PLANNED,
    }),
    __metadata("design:type", typeof (_b = typeof product_constants_1.ProductStatus !== "undefined" && product_constants_1.ProductStatus) === "function" ? _b : Object)
], Product.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: product_constants_1.PRODUCT_CONSTANTS.MIN_PRIORITY, max: product_constants_1.PRODUCT_CONSTANTS.MAX_PRIORITY }),
    __metadata("design:type", Number)
], Product.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Product.prototype, "createdAt", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),

/***/ "./src/product-planning/services/product-ai.service.ts":
/*!*************************************************************!*\
  !*** ./src/product-planning/services/product-ai.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductAiService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ProductAiService = class ProductAiService {
    async predictDemand(products) {
        return {
            predictions: products.map(product => ({
                productId: product._id.toString(),
                predictedDemand: Math.floor(Math.random() * 1000),
                confidence: Math.random(),
                nextQuarterForecast: Math.floor(Math.random() * 1200),
            })),
        };
    }
    async optimizeProduction(product) {
        return {
            productId: product._id.toString(),
            recommendations: [
                {
                    optimizedQuantity: Math.ceil(product.quantity * 1.1),
                    suggestedStartDate: new Date(),
                    expectedEfficiencyGain: Math.random() * 0.2,
                },
            ],
            alternativeProcesses: [],
        };
    }
};
exports.ProductAiService = ProductAiService;
exports.ProductAiService = ProductAiService = __decorate([
    (0, common_1.Injectable)()
], ProductAiService);


/***/ }),

/***/ "./src/product-planning/services/product-demand.service.ts":
/*!*****************************************************************!*\
  !*** ./src/product-planning/services/product-demand.service.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductDemandService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_ai_service_1 = __webpack_require__(/*! ./product-ai.service */ "./src/product-planning/services/product-ai.service.ts");
let ProductDemandService = class ProductDemandService {
    constructor(productAiService) {
        this.productAiService = productAiService;
    }
    async predictDemand(products) {
        return this.productAiService.predictDemand(products);
    }
    async calculateHistoricalDemand(products) {
        return {
            historicalData: products.map(product => ({
                productId: product.id,
                averageDemand: 0,
                peakDemand: 0,
                seasonalityFactors: [],
            })),
        };
    }
    async analyzeDemandTrends(products) {
        return {
            trends: products.map(product => ({
                productId: product.id,
                trend: 'stable',
                confidence: Math.random(),
            })),
        };
    }
};
exports.ProductDemandService = ProductDemandService;
exports.ProductDemandService = ProductDemandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof product_ai_service_1.ProductAiService !== "undefined" && product_ai_service_1.ProductAiService) === "function" ? _a : Object])
], ProductDemandService);


/***/ }),

/***/ "./src/product-planning/services/product-optimization.service.ts":
/*!***********************************************************************!*\
  !*** ./src/product-planning/services/product-optimization.service.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductOptimizationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_ai_service_1 = __webpack_require__(/*! ./product-ai.service */ "./src/product-planning/services/product-ai.service.ts");
let ProductOptimizationService = class ProductOptimizationService {
    constructor(productAiService) {
        this.productAiService = productAiService;
    }
    async optimizeProduction(product) {
        return this.productAiService.optimizeProduction(product);
    }
    async calculateOptimalBatchSize(product) {
        return {
            productId: product.id,
            optimalBatchSize: Math.ceil(product.quantity * 1.1),
            costSavings: Math.random() * 1000,
        };
    }
    async suggestProcessImprovements(product) {
        return {
            productId: product.id,
            improvements: [
                {
                    process: product.processes[0],
                    suggestion: 'Optimize resource allocation',
                    impact: 'High',
                },
            ],
        };
    }
};
exports.ProductOptimizationService = ProductOptimizationService;
exports.ProductOptimizationService = ProductOptimizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof product_ai_service_1.ProductAiService !== "undefined" && product_ai_service_1.ProductAiService) === "function" ? _a : Object])
], ProductOptimizationService);


/***/ }),

/***/ "./src/product-planning/services/product-planning.service.ts":
/*!*******************************************************************!*\
  !*** ./src/product-planning/services/product-planning.service.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductPlanningService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_repository_1 = __webpack_require__(/*! ../repositories/product.repository */ "./src/product-planning/repositories/product.repository.ts");
const product_validation_service_1 = __webpack_require__(/*! ./product-validation.service */ "./src/product-planning/services/product-validation.service.ts");
const product_demand_service_1 = __webpack_require__(/*! ./product-demand.service */ "./src/product-planning/services/product-demand.service.ts");
const product_optimization_service_1 = __webpack_require__(/*! ./product-optimization.service */ "./src/product-planning/services/product-optimization.service.ts");
const product_scheduling_service_1 = __webpack_require__(/*! ./product-scheduling.service */ "./src/product-planning/services/product-scheduling.service.ts");
const error_utils_1 = __webpack_require__(/*! @shared/utils/error.utils */ "./src/shared/utils/error.utils.ts");
let ProductPlanningService = class ProductPlanningService {
    constructor(repository, validationService, demandService, optimizationService, schedulingService) {
        this.repository = repository;
        this.validationService = validationService;
        this.demandService = demandService;
        this.optimizationService = optimizationService;
        this.schedulingService = schedulingService;
    }
    async create(createProductDto) {
        await this.validationService.validateCreateDto(createProductDto);
        const product = await this.repository.create(createProductDto);
        return (0, error_utils_1.throwIfNotFound)(product, 'Product', 'new');
    }
    async findAll() {
        return this.repository.findAll();
    }
    async findOne(id) {
        const product = await this.repository.findById(id);
        return (0, error_utils_1.throwIfNotFound)(product, 'Product', id);
    }
    async update(id, updateProductDto) {
        await this.validationService.validateUpdateDto(updateProductDto);
        const updatedProduct = await this.repository.update(id, updateProductDto);
        return (0, error_utils_1.throwIfNotFound)(updatedProduct, 'Product', id);
    }
    async remove(id) {
        const deletedProduct = await this.repository.delete(id);
        return (0, error_utils_1.throwIfNotFound)(deletedProduct, 'Product', id);
    }
    async predictDemand() {
        const products = await this.findAll();
        if (!products.length) {
            throw new common_1.NotFoundException('No products available for demand prediction');
        }
        return this.demandService.predictDemand(products);
    }
    async optimizeProduction(id) {
        const product = await this.findOne(id);
        return this.optimizationService.optimizeProduction(product);
    }
    async getProductSchedule(id) {
        const product = await this.findOne(id);
        return this.schedulingService.createProductionSchedule(product);
    }
    async findByMaterial(materialId) {
        const products = await this.repository.findByMaterialId(materialId);
        return products || [];
    }
    async findByProcess(processId) {
        const products = await this.repository.findByProcessId(processId);
        return products || [];
    }
    async updateProductStatus(id, status) {
        const product = await this.findOne(id);
        await this.validationService.validateStatus(status);
        const productData = product.toObject();
        return this.update(id, { ...productData, status });
    }
};
exports.ProductPlanningService = ProductPlanningService;
exports.ProductPlanningService = ProductPlanningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _a : Object, typeof (_b = typeof product_validation_service_1.ProductValidationService !== "undefined" && product_validation_service_1.ProductValidationService) === "function" ? _b : Object, typeof (_c = typeof product_demand_service_1.ProductDemandService !== "undefined" && product_demand_service_1.ProductDemandService) === "function" ? _c : Object, typeof (_d = typeof product_optimization_service_1.ProductOptimizationService !== "undefined" && product_optimization_service_1.ProductOptimizationService) === "function" ? _d : Object, typeof (_e = typeof product_scheduling_service_1.ProductSchedulingService !== "undefined" && product_scheduling_service_1.ProductSchedulingService) === "function" ? _e : Object])
], ProductPlanningService);


/***/ }),

/***/ "./src/product-planning/services/product-scheduling.service.ts":
/*!*********************************************************************!*\
  !*** ./src/product-planning/services/product-scheduling.service.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchedulingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const date_service_1 = __webpack_require__(/*! @shared/services/date.service */ "./src/shared/services/date.service.ts");
const error_utils_1 = __webpack_require__(/*! @shared/utils/error.utils */ "./src/shared/utils/error.utils.ts");
let ProductSchedulingService = class ProductSchedulingService {
    constructor(dateService) {
        this.dateService = dateService;
    }
    async createProductionSchedule(product) {
        (0, error_utils_1.throwIfNotFound)(product, 'Product', product._id?.toString() || 'unknown');
        const startDate = this.dateService.getCurrentDate();
        const endDate = product.deadline;
        return {
            productId: product._id.toString(),
            schedule: {
                startDate,
                endDate,
                milestones: this.generateMilestones(product, startDate, endDate),
            },
        };
    }
    generateMilestones(product, startDate, endDate) {
        const duration = this.dateService.calculateLeadTime(startDate, endDate);
        const milestones = [];
        if (!product.processes || product.processes.length === 0) {
            return milestones;
        }
        product.processes.forEach((process, index) => {
            if (!process || !process._id) {
                return;
            }
            const processStartDate = this.dateService.addDays(startDate, Math.floor((duration / product.processes.length) * index));
            const processEndDate = this.dateService.addDays(startDate, Math.floor((duration / product.processes.length) * (index + 1)));
            milestones.push({
                processId: process._id.toString(),
                plannedStartDate: processStartDate,
                plannedEndDate: processEndDate,
            });
        });
        return milestones;
    }
};
exports.ProductSchedulingService = ProductSchedulingService;
exports.ProductSchedulingService = ProductSchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof date_service_1.DateService !== "undefined" && date_service_1.DateService) === "function" ? _a : Object])
], ProductSchedulingService);


/***/ }),

/***/ "./src/product-planning/services/product-validation.service.ts":
/*!*********************************************************************!*\
  !*** ./src/product-planning/services/product-validation.service.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductValidationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_constants_1 = __webpack_require__(/*! ../constants/product.constants */ "./src/product-planning/constants/product.constants.ts");
const validation_service_1 = __webpack_require__(/*! @shared/services/validation.service */ "./src/shared/services/validation.service.ts");
let ProductValidationService = class ProductValidationService {
    constructor(validationService) {
        this.validationService = validationService;
    }
    async validateCreateDto(dto) {
        this.validateQuantity(dto.quantity);
        this.validatePriority(dto.priority);
        this.validateDeadline(dto.deadline);
        this.validateRequiredMaterials(dto.requiredMaterials);
        this.validateProcesses(dto.processes);
        if (dto.status) {
            await this.validateStatus(dto.status);
        }
    }
    async validateUpdateDto(dto) {
        if (dto.quantity !== undefined) {
            this.validateQuantity(dto.quantity);
        }
        if (dto.priority !== undefined) {
            this.validatePriority(dto.priority);
        }
        if (dto.deadline) {
            this.validateDeadline(dto.deadline);
        }
        if (dto.status) {
            await this.validateStatus(dto.status);
        }
    }
    async validateStatus(status) {
        const validStatuses = Object.values(product_constants_1.PRODUCT_CONSTANTS.STATUS);
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid product status. Must be one of: ${validStatuses.join(', ')}`);
        }
    }
    validateQuantity(quantity) {
        if (quantity < product_constants_1.PRODUCT_CONSTANTS.MIN_QUANTITY) {
            throw new common_1.BadRequestException(`Quantity must be greater than or equal to ${product_constants_1.PRODUCT_CONSTANTS.MIN_QUANTITY}`);
        }
    }
    validatePriority(priority) {
        if (priority !== undefined && !this.isValidPriority(priority)) {
            throw new common_1.BadRequestException(`Priority must be between ${product_constants_1.PRODUCT_CONSTANTS.MIN_PRIORITY} and ${product_constants_1.PRODUCT_CONSTANTS.MAX_PRIORITY}`);
        }
    }
    validateDeadline(deadline) {
        if (!this.validationService.isValidDate(deadline)) {
            throw new common_1.BadRequestException('Invalid deadline date');
        }
        if (new Date(deadline) <= new Date()) {
            throw new common_1.BadRequestException('Deadline must be in the future');
        }
    }
    validateRequiredMaterials(materials) {
        if (!materials?.length) {
            throw new common_1.BadRequestException('At least one required material must be specified');
        }
    }
    validateProcesses(processes) {
        if (!processes?.length) {
            throw new common_1.BadRequestException('At least one process must be specified');
        }
    }
    isValidPriority(priority) {
        return (priority >= product_constants_1.PRODUCT_CONSTANTS.MIN_PRIORITY &&
            priority <= product_constants_1.PRODUCT_CONSTANTS.MAX_PRIORITY);
    }
};
exports.ProductValidationService = ProductValidationService;
exports.ProductValidationService = ProductValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof validation_service_1.ValidationService !== "undefined" && validation_service_1.ValidationService) === "function" ? _a : Object])
], ProductValidationService);


/***/ }),

/***/ "./src/raw-materials/constants/raw-material.constants.ts":
/*!***************************************************************!*\
  !*** ./src/raw-materials/constants/raw-material.constants.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RAW_MATERIAL_CONSTANTS = void 0;
exports.RAW_MATERIAL_CONSTANTS = {
    MIN_QUANTITY: 0,
    MAX_LEAD_TIME: 365,
    VALID_UNITS: ['kg', 'g', 'l', 'ml', 'pcs'],
};


/***/ }),

/***/ "./src/raw-materials/dto/create-raw-material.dto.ts":
/*!**********************************************************!*\
  !*** ./src/raw-materials/dto/create-raw-material.dto.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRawMaterialDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateRawMaterialDto {
}
exports.CreateRawMaterialDto = CreateRawMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRawMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRawMaterialDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRawMaterialDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRawMaterialDto.prototype, "supplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateRawMaterialDto.prototype, "leadTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateRawMaterialDto.prototype, "minimumStock", void 0);


/***/ }),

/***/ "./src/raw-materials/raw-materials.controller.ts":
/*!*******************************************************!*\
  !*** ./src/raw-materials/raw-materials.controller.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const raw_materials_service_1 = __webpack_require__(/*! ./raw-materials.service */ "./src/raw-materials/raw-materials.service.ts");
const create_raw_material_dto_1 = __webpack_require__(/*! ./dto/create-raw-material.dto */ "./src/raw-materials/dto/create-raw-material.dto.ts");
let RawMaterialsController = class RawMaterialsController {
    constructor(rawMaterialsService) {
        this.rawMaterialsService = rawMaterialsService;
    }
    create(createRawMaterialDto) {
        return this.rawMaterialsService.create(createRawMaterialDto);
    }
    findAll() {
        return this.rawMaterialsService.findAll();
    }
    findOne(id) {
        return this.rawMaterialsService.findOne(id);
    }
    update(id, updateRawMaterialDto) {
        return this.rawMaterialsService.update(id, updateRawMaterialDto);
    }
    remove(id) {
        return this.rawMaterialsService.remove(id);
    }
    predictShortages() {
        return this.rawMaterialsService.predictMaterialShortages();
    }
};
exports.RawMaterialsController = RawMaterialsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new raw material' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_raw_material_dto_1.CreateRawMaterialDto !== "undefined" && create_raw_material_dto_1.CreateRawMaterialDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RawMaterialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all raw materials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RawMaterialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a raw material by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], RawMaterialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a raw material' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof create_raw_material_dto_1.CreateRawMaterialDto !== "undefined" && create_raw_material_dto_1.CreateRawMaterialDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], RawMaterialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a raw material' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], RawMaterialsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('ai/predict-shortages'),
    (0, swagger_1.ApiOperation)({ summary: 'Predict material shortages using AI/ML' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RawMaterialsController.prototype, "predictShortages", null);
exports.RawMaterialsController = RawMaterialsController = __decorate([
    (0, swagger_1.ApiTags)('raw-materials'),
    (0, common_1.Controller)('raw-materials'),
    __metadata("design:paramtypes", [typeof (_a = typeof raw_materials_service_1.RawMaterialsService !== "undefined" && raw_materials_service_1.RawMaterialsService) === "function" ? _a : Object])
], RawMaterialsController);


/***/ }),

/***/ "./src/raw-materials/raw-materials.module.ts":
/*!***************************************************!*\
  !*** ./src/raw-materials/raw-materials.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const raw_materials_controller_1 = __webpack_require__(/*! ./raw-materials.controller */ "./src/raw-materials/raw-materials.controller.ts");
const raw_materials_service_1 = __webpack_require__(/*! ./services/raw-materials.service */ "./src/raw-materials/services/raw-materials.service.ts");
const raw_material_repository_1 = __webpack_require__(/*! ./repositories/raw-material.repository */ "./src/raw-materials/repositories/raw-material.repository.ts");
const raw_material_validator_1 = __webpack_require__(/*! ./validators/raw-material.validator */ "./src/raw-materials/validators/raw-material.validator.ts");
const raw_material_ai_service_1 = __webpack_require__(/*! ./services/raw-material-ai.service */ "./src/raw-materials/services/raw-material-ai.service.ts");
const raw_material_schema_1 = __webpack_require__(/*! ./schemas/raw-material.schema */ "./src/raw-materials/schemas/raw-material.schema.ts");
let RawMaterialsModule = class RawMaterialsModule {
};
exports.RawMaterialsModule = RawMaterialsModule;
exports.RawMaterialsModule = RawMaterialsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: raw_material_schema_1.RawMaterial.name, schema: raw_material_schema_1.RawMaterialSchema },
            ]),
        ],
        controllers: [raw_materials_controller_1.RawMaterialsController],
        providers: [
            raw_materials_service_1.RawMaterialsService,
            raw_material_repository_1.RawMaterialRepository,
            raw_material_validator_1.RawMaterialValidator,
            raw_material_ai_service_1.RawMaterialAiService,
        ],
        exports: [raw_materials_service_1.RawMaterialsService],
    })
], RawMaterialsModule);


/***/ }),

/***/ "./src/raw-materials/raw-materials.service.ts":
/*!****************************************************!*\
  !*** ./src/raw-materials/raw-materials.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const raw_material_schema_1 = __webpack_require__(/*! ./schemas/raw-material.schema */ "./src/raw-materials/schemas/raw-material.schema.ts");
const error_utils_1 = __webpack_require__(/*! @shared/utils/error.utils */ "./src/shared/utils/error.utils.ts");
let RawMaterialsService = class RawMaterialsService {
    constructor(rawMaterialModel) {
        this.rawMaterialModel = rawMaterialModel;
    }
    async create(createRawMaterialDto) {
        const createdMaterial = new this.rawMaterialModel(createRawMaterialDto);
        return createdMaterial.save();
    }
    async findAll() {
        return this.rawMaterialModel.find().exec();
    }
    async findOne(id) {
        const material = await this.rawMaterialModel.findById(id).exec();
        return (0, error_utils_1.throwIfNotFound)(material, 'Raw Material', id);
    }
    async update(id, updateRawMaterialDto) {
        const updatedMaterial = await this.rawMaterialModel
            .findByIdAndUpdate(id, updateRawMaterialDto, { new: true })
            .exec();
        return (0, error_utils_1.throwIfNotFound)(updatedMaterial, 'Raw Material', id);
    }
    async remove(id) {
        const deletedMaterial = await this.rawMaterialModel.findByIdAndDelete(id).exec();
        return (0, error_utils_1.throwIfNotFound)(deletedMaterial, 'Raw Material', id);
    }
    async predictMaterialShortages() {
        return { message: 'Material shortage prediction not implemented yet' };
    }
};
exports.RawMaterialsService = RawMaterialsService;
exports.RawMaterialsService = RawMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(raw_material_schema_1.RawMaterial.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], RawMaterialsService);


/***/ }),

/***/ "./src/raw-materials/repositories/raw-material.repository.ts":
/*!*******************************************************************!*\
  !*** ./src/raw-materials/repositories/raw-material.repository.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const raw_material_schema_1 = __webpack_require__(/*! ../schemas/raw-material.schema */ "./src/raw-materials/schemas/raw-material.schema.ts");
let RawMaterialRepository = class RawMaterialRepository {
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        const entity = new this.model(dto);
        return entity.save();
    }
    async findAll() {
        return this.model.find().exec();
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async update(id, dto) {
        return this.model
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async isStockSufficient(material) {
        return material.quantity > (material.minimumStock || 0);
    }
};
exports.RawMaterialRepository = RawMaterialRepository;
exports.RawMaterialRepository = RawMaterialRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(raw_material_schema_1.RawMaterial.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], RawMaterialRepository);


/***/ }),

/***/ "./src/raw-materials/schemas/raw-material.schema.ts":
/*!**********************************************************!*\
  !*** ./src/raw-materials/schemas/raw-material.schema.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialSchema = exports.RawMaterial = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let RawMaterial = class RawMaterial extends mongoose_2.Document {
};
exports.RawMaterial = RawMaterial;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RawMaterial.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RawMaterial.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RawMaterial.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RawMaterial.prototype, "supplier", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], RawMaterial.prototype, "leadTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], RawMaterial.prototype, "minimumStock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RawMaterial.prototype, "createdAt", void 0);
exports.RawMaterial = RawMaterial = __decorate([
    (0, mongoose_1.Schema)()
], RawMaterial);
exports.RawMaterialSchema = mongoose_1.SchemaFactory.createForClass(RawMaterial);


/***/ }),

/***/ "./src/raw-materials/services/raw-material-ai.service.ts":
/*!***************************************************************!*\
  !*** ./src/raw-materials/services/raw-material-ai.service.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialAiService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let RawMaterialAiService = class RawMaterialAiService {
    async predictShortages(materials) {
        return {
            predictions: materials.map(material => ({
                materialId: material.id,
                shortageRisk: Math.random(),
                recommendedReorderDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            })),
        };
    }
    async optimizeInventoryLevels(materials) {
        return {
            recommendations: materials.map(material => ({
                materialId: material.id,
                optimumStock: material.quantity * 1.2,
                safetyStock: material.minimumStock || material.quantity * 0.3,
            })),
        };
    }
};
exports.RawMaterialAiService = RawMaterialAiService;
exports.RawMaterialAiService = RawMaterialAiService = __decorate([
    (0, common_1.Injectable)()
], RawMaterialAiService);


/***/ }),

/***/ "./src/raw-materials/services/raw-materials.service.ts":
/*!*************************************************************!*\
  !*** ./src/raw-materials/services/raw-materials.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_utils_1 = __webpack_require__(/*! @shared/utils/mongoose.utils */ "./src/shared/utils/mongoose.utils.ts");
const raw_material_repository_1 = __webpack_require__(/*! ../repositories/raw-material.repository */ "./src/raw-materials/repositories/raw-material.repository.ts");
const raw_material_validator_1 = __webpack_require__(/*! ../validators/raw-material.validator */ "./src/raw-materials/validators/raw-material.validator.ts");
let RawMaterialsService = class RawMaterialsService {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }
    async create(dto) {
        await this.validator.validateCreate(dto);
        return this.repository.create(dto);
    }
    async findAll() {
        return this.repository.findAll();
    }
    async findOne(id) {
        return (0, mongoose_utils_1.findOneOrThrow)(this.repository.findById(id), id, 'Raw Material');
    }
    async update(id, dto) {
        await this.validator.validateUpdate(dto);
        return (0, mongoose_utils_1.updateOneOrThrow)(this.repository.update(id, dto), id, 'Raw Material');
    }
    async remove(id) {
        return (0, mongoose_utils_1.deleteOneOrThrow)(this.repository.delete(id), id, 'Raw Material');
    }
    async checkStock(id) {
        const material = await this.findOne(id);
        return this.repository.isStockSufficient(material);
    }
};
exports.RawMaterialsService = RawMaterialsService;
exports.RawMaterialsService = RawMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof raw_material_repository_1.RawMaterialRepository !== "undefined" && raw_material_repository_1.RawMaterialRepository) === "function" ? _a : Object, typeof (_b = typeof raw_material_validator_1.RawMaterialValidator !== "undefined" && raw_material_validator_1.RawMaterialValidator) === "function" ? _b : Object])
], RawMaterialsService);


/***/ }),

/***/ "./src/raw-materials/validators/raw-material.validator.ts":
/*!****************************************************************!*\
  !*** ./src/raw-materials/validators/raw-material.validator.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawMaterialValidator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const raw_material_constants_1 = __webpack_require__(/*! ../constants/raw-material.constants */ "./src/raw-materials/constants/raw-material.constants.ts");
let RawMaterialValidator = class RawMaterialValidator {
    async validateCreate(dto) {
        if (dto.quantity < raw_material_constants_1.RAW_MATERIAL_CONSTANTS.MIN_QUANTITY) {
            throw new common_1.BadRequestException('Quantity must be greater than or equal to minimum quantity');
        }
        if (dto.leadTime && dto.leadTime > raw_material_constants_1.RAW_MATERIAL_CONSTANTS.MAX_LEAD_TIME) {
            throw new common_1.BadRequestException('Lead time exceeds maximum allowed value');
        }
        if (!raw_material_constants_1.RAW_MATERIAL_CONSTANTS.VALID_UNITS.includes(dto.unit)) {
            throw new common_1.BadRequestException('Invalid unit specified');
        }
    }
    async validateUpdate(dto) {
        if (dto.quantity !== undefined && dto.quantity < raw_material_constants_1.RAW_MATERIAL_CONSTANTS.MIN_QUANTITY) {
            throw new common_1.BadRequestException('Quantity must be greater than or equal to minimum quantity');
        }
        if (dto.leadTime && dto.leadTime > raw_material_constants_1.RAW_MATERIAL_CONSTANTS.MAX_LEAD_TIME) {
            throw new common_1.BadRequestException('Lead time exceeds maximum allowed value');
        }
        if (dto.unit && !raw_material_constants_1.RAW_MATERIAL_CONSTANTS.VALID_UNITS.includes(dto.unit)) {
            throw new common_1.BadRequestException('Invalid unit specified');
        }
    }
};
exports.RawMaterialValidator = RawMaterialValidator;
exports.RawMaterialValidator = RawMaterialValidator = __decorate([
    (0, common_1.Injectable)()
], RawMaterialValidator);


/***/ }),

/***/ "./src/reporting/constants/report.constants.ts":
/*!*****************************************************!*\
  !*** ./src/reporting/constants/report.constants.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REPORT_CONSTANTS = void 0;
exports.REPORT_CONSTANTS = {
    TYPES: {
        PRODUCTION: 'production',
        COST: 'cost',
        PERFORMANCE: 'performance',
        QUALITY: 'quality',
    },
    METRICS: {
        EFFICIENCY: 'efficiency',
        COST: 'cost',
        QUALITY: 'quality',
        PRODUCTION_RATE: 'productionRate',
    },
};


/***/ }),

/***/ "./src/reporting/dto/create-report.dto.ts":
/*!************************************************!*\
  !*** ./src/reporting/dto/create-report.dto.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateReportDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateReportDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateReportDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], CreateReportDto.prototype, "metrics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateReportDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof Record !== "undefined" && Record) === "function" ? _d : Object)
], CreateReportDto.prototype, "insights", void 0);


/***/ }),

/***/ "./src/reporting/dto/update-report.dto.ts":
/*!************************************************!*\
  !*** ./src/reporting/dto/update-report.dto.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateReportDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_report_dto_1 = __webpack_require__(/*! ./create-report.dto */ "./src/reporting/dto/create-report.dto.ts");
class UpdateReportDto extends (0, swagger_1.PartialType)(create_report_dto_1.CreateReportDto) {
}
exports.UpdateReportDto = UpdateReportDto;


/***/ }),

/***/ "./src/reporting/reporting.controller.ts":
/*!***********************************************!*\
  !*** ./src/reporting/reporting.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportingController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const reporting_service_1 = __webpack_require__(/*! ./reporting.service */ "./src/reporting/reporting.service.ts");
const create_report_dto_1 = __webpack_require__(/*! ./dto/create-report.dto */ "./src/reporting/dto/create-report.dto.ts");
const update_report_dto_1 = __webpack_require__(/*! ./dto/update-report.dto */ "./src/reporting/dto/update-report.dto.ts");
let ReportingController = class ReportingController {
    constructor(reportingService) {
        this.reportingService = reportingService;
    }
    create(createReportDto) {
        return this.reportingService.create(createReportDto);
    }
    findAll() {
        return this.reportingService.findAll();
    }
    findOne(id) {
        return this.reportingService.findOne(id);
    }
    update(id, updateReportDto) {
        return this.reportingService.update(id, updateReportDto);
    }
    remove(id) {
        return this.reportingService.remove(id);
    }
    analyzePerformance(id) {
        return this.reportingService.analyzePerformance(id);
    }
    predictMetrics() {
        return this.reportingService.predictMetrics();
    }
    generateProductionReport(startDate, endDate) {
        return this.reportingService.generateProductionReport(startDate, endDate);
    }
    generateCostReport(startDate, endDate) {
        return this.reportingService.generateCostReport(startDate, endDate);
    }
};
exports.ReportingController = ReportingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new report' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_report_dto_1.CreateReportDto !== "undefined" && create_report_dto_1.CreateReportDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReportingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reports' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ReportingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a report by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ReportingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a report' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_report_dto_1.UpdateReportDto !== "undefined" && update_report_dto_1.UpdateReportDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ReportingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a report' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ReportingController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('ai/analyze-performance/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Analyze report performance using AI/ML' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportingController.prototype, "analyzePerformance", null);
__decorate([
    (0, common_1.Get)('ai/predict-metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Predict future metrics using AI/ML' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportingController.prototype, "predictMetrics", null);
__decorate([
    (0, common_1.Post)('generate/production'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a production report' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object, typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ReportingController.prototype, "generateProductionReport", null);
__decorate([
    (0, common_1.Post)('generate/cost'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a cost analysis report' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof Date !== "undefined" && Date) === "function" ? _m : Object, typeof (_o = typeof Date !== "undefined" && Date) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ReportingController.prototype, "generateCostReport", null);
exports.ReportingController = ReportingController = __decorate([
    (0, swagger_1.ApiTags)('reporting'),
    (0, common_1.Controller)('reporting'),
    __metadata("design:paramtypes", [typeof (_a = typeof reporting_service_1.ReportingService !== "undefined" && reporting_service_1.ReportingService) === "function" ? _a : Object])
], ReportingController);


/***/ }),

/***/ "./src/reporting/reporting.module.ts":
/*!*******************************************!*\
  !*** ./src/reporting/reporting.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportingModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const reporting_controller_1 = __webpack_require__(/*! ./reporting.controller */ "./src/reporting/reporting.controller.ts");
const reporting_service_1 = __webpack_require__(/*! ./reporting.service */ "./src/reporting/reporting.service.ts");
const report_ai_service_1 = __webpack_require__(/*! ./services/report-ai.service */ "./src/reporting/services/report-ai.service.ts");
const report_validation_service_1 = __webpack_require__(/*! ./services/report-validation.service */ "./src/reporting/services/report-validation.service.ts");
const report_repository_1 = __webpack_require__(/*! ./repositories/report.repository */ "./src/reporting/repositories/report.repository.ts");
const report_schema_1 = __webpack_require__(/*! ./schemas/report.schema */ "./src/reporting/schemas/report.schema.ts");
const shared_module_1 = __webpack_require__(/*! ../shared/shared.module */ "./src/shared/shared.module.ts");
let ReportingModule = class ReportingModule {
};
exports.ReportingModule = ReportingModule;
exports.ReportingModule = ReportingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: report_schema_1.Report.name, schema: report_schema_1.ReportSchema },
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [reporting_controller_1.ReportingController],
        providers: [
            reporting_service_1.ReportingService,
            report_ai_service_1.ReportAiService,
            report_validation_service_1.ReportValidationService,
            report_repository_1.ReportRepository,
        ],
        exports: [reporting_service_1.ReportingService],
    })
], ReportingModule);


/***/ }),

/***/ "./src/reporting/reporting.service.ts":
/*!********************************************!*\
  !*** ./src/reporting/reporting.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const report_schema_1 = __webpack_require__(/*! ./schemas/report.schema */ "./src/reporting/schemas/report.schema.ts");
const report_ai_service_1 = __webpack_require__(/*! ./services/report-ai.service */ "./src/reporting/services/report-ai.service.ts");
const error_utils_1 = __webpack_require__(/*! @shared/utils/error.utils */ "./src/shared/utils/error.utils.ts");
let ReportingService = class ReportingService {
    constructor(reportModel, reportAiService) {
        this.reportModel = reportModel;
        this.reportAiService = reportAiService;
    }
    async create(createReportDto) {
        const createdReport = new this.reportModel(createReportDto);
        const report = await createdReport.save();
        return (0, error_utils_1.throwIfNotFound)(report, 'Report', 'new');
    }
    async findAll() {
        const reports = await this.reportModel.find().exec();
        return reports || [];
    }
    async findOne(id) {
        const report = await this.reportModel.findById(id).exec();
        return (0, error_utils_1.throwIfNotFound)(report, 'Report', id);
    }
    async update(id, updateReportDto) {
        const report = await this.reportModel
            .findByIdAndUpdate(id, updateReportDto, { new: true })
            .exec();
        return (0, error_utils_1.throwIfNotFound)(report, 'Report', id);
    }
    async remove(id) {
        const report = await this.reportModel.findByIdAndDelete(id).exec();
        return (0, error_utils_1.throwIfNotFound)(report, 'Report', id);
    }
    async analyzePerformance(id) {
        const report = await this.findOne(id);
        return this.reportAiService.analyzePerformance(report);
    }
    async predictMetrics() {
        const historicalReports = await this.findAll();
        (0, error_utils_1.throwIfInvalid)(historicalReports.length > 0, 'No historical reports available for prediction');
        return this.reportAiService.predictMetrics(historicalReports);
    }
    async generateProductionReport(startDate, endDate) {
        (0, error_utils_1.throwIfInvalid)(startDate < endDate, 'Start date must be before end date');
        const reportData = {
            name: 'Production Report',
            type: 'production',
            startDate,
            endDate,
            metrics: {
                totalProduction: 0,
                efficiency: 0,
                qualityScore: 0,
            },
            data: [],
            insights: {},
        };
        return this.create(reportData);
    }
    async generateCostReport(startDate, endDate) {
        (0, error_utils_1.throwIfInvalid)(startDate < endDate, 'Start date must be before end date');
        const reportData = {
            name: 'Cost Analysis Report',
            type: 'cost',
            startDate,
            endDate,
            metrics: {
                totalCost: 0,
                averageCost: 0,
                costVariance: 0,
            },
            data: [],
            insights: {},
        };
        return this.create(reportData);
    }
};
exports.ReportingService = ReportingService;
exports.ReportingService = ReportingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof report_ai_service_1.ReportAiService !== "undefined" && report_ai_service_1.ReportAiService) === "function" ? _b : Object])
], ReportingService);


/***/ }),

/***/ "./src/reporting/repositories/report.repository.ts":
/*!*********************************************************!*\
  !*** ./src/reporting/repositories/report.repository.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const report_schema_1 = __webpack_require__(/*! ../schemas/report.schema */ "./src/reporting/schemas/report.schema.ts");
let ReportRepository = class ReportRepository {
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        const entity = new this.model(dto);
        return entity.save();
    }
    async findAll() {
        return this.model.find().exec();
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async update(id, dto) {
        return this.model
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async findByDateRange(startDate, endDate) {
        return this.model
            .find({
            startDate: { $gte: startDate },
            endDate: { $lte: endDate },
        })
            .exec();
    }
    async findByType(type) {
        return this.model
            .find({ type })
            .exec();
    }
};
exports.ReportRepository = ReportRepository;
exports.ReportRepository = ReportRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ReportRepository);


/***/ }),

/***/ "./src/reporting/schemas/report.schema.ts":
/*!************************************************!*\
  !*** ./src/reporting/schemas/report.schema.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportSchema = exports.Report = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let Report = class Report {
};
exports.Report = Report;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Report.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Report.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Report.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Report.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], Report.prototype, "metrics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Schema.Types.Mixed] }),
    __metadata("design:type", Array)
], Report.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", typeof (_d = typeof Record !== "undefined" && Record) === "function" ? _d : Object)
], Report.prototype, "insights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Report.prototype, "updatedAt", void 0);
exports.Report = Report = __decorate([
    (0, mongoose_1.Schema)()
], Report);
exports.ReportSchema = mongoose_1.SchemaFactory.createForClass(Report);
exports.ReportSchema.index({ type: 1, startDate: 1, endDate: 1 });
exports.ReportSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});


/***/ }),

/***/ "./src/reporting/services/report-ai.service.ts":
/*!*****************************************************!*\
  !*** ./src/reporting/services/report-ai.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportAiService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ReportAiService = class ReportAiService {
    async analyzePerformance(report) {
        return {
            reportId: report._id.toString(),
            analysis: {
                efficiency: Math.random(),
                bottlenecks: [],
                recommendations: [
                    'Optimize resource allocation',
                    'Adjust production schedule',
                ],
            },
            trends: {
                production: 'increasing',
                costs: 'stable',
                quality: 'improving',
            },
        };
    }
    async predictMetrics(historicalReports) {
        return {
            predictions: {
                productionCost: Math.random() * 10000,
                efficiency: Math.random(),
                quality: Math.random(),
            },
            confidence: Math.random(),
            suggestedActions: [
                'Increase automation in high-cost areas',
                'Implement preventive maintenance',
            ],
            reportIds: historicalReports.map(report => report._id.toString()),
        };
    }
};
exports.ReportAiService = ReportAiService;
exports.ReportAiService = ReportAiService = __decorate([
    (0, common_1.Injectable)()
], ReportAiService);


/***/ }),

/***/ "./src/reporting/services/report-validation.service.ts":
/*!*************************************************************!*\
  !*** ./src/reporting/services/report-validation.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportValidationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const report_constants_1 = __webpack_require__(/*! ../constants/report.constants */ "./src/reporting/constants/report.constants.ts");
const validation_service_1 = __webpack_require__(/*! @shared/services/validation.service */ "./src/shared/services/validation.service.ts");
let ReportValidationService = class ReportValidationService {
    constructor(validationService) {
        this.validationService = validationService;
    }
    validateCreate(dto) {
        this.validateDates(dto.startDate, dto.endDate);
        this.validateType(dto.type);
        this.validateName(dto.name);
    }
    validateUpdate(dto) {
        if (dto.startDate && dto.endDate) {
            this.validateDates(dto.startDate, dto.endDate);
        }
        if (dto.type) {
            this.validateType(dto.type);
        }
        if (dto.name) {
            this.validateName(dto.name);
        }
    }
    validateDates(startDate, endDate) {
        if (!this.validationService.isValidDate(startDate) ||
            !this.validationService.isValidDate(endDate)) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
    }
    validateType(type) {
        const validTypes = Object.values(report_constants_1.REPORT_CONSTANTS.TYPES);
        if (!validTypes.includes(type)) {
            throw new common_1.BadRequestException(`Invalid report type. Must be one of: ${validTypes.join(', ')}`);
        }
    }
    validateName(name) {
        if (!name || name.trim().length === 0) {
            throw new common_1.BadRequestException('Report name cannot be empty');
        }
    }
};
exports.ReportValidationService = ReportValidationService;
exports.ReportValidationService = ReportValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof validation_service_1.ValidationService !== "undefined" && validation_service_1.ValidationService) === "function" ? _a : Object])
], ReportValidationService);


/***/ }),

/***/ "./src/shared/services/database.service.ts":
/*!*************************************************!*\
  !*** ./src/shared/services/database.service.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
const mongoose_2 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const logger_service_1 = __webpack_require__(/*! ./logger.service */ "./src/shared/services/logger.service.ts");
let DatabaseService = class DatabaseService {
    constructor(connection, logger) {
        this.connection = connection;
        this.logger = logger;
        this.logger.setContext('DatabaseService');
    }
    onApplicationBootstrap() {
        this.handleDatabaseEvents();
        this.checkConnection();
    }
    handleDatabaseEvents() {
        this.connection.on('connected', () => {
            this.logger.log('✅ MongoDB connected successfully');
        });
        this.connection.on('disconnected', () => {
            this.logger.warn('⚠️ MongoDB disconnected');
        });
        this.connection.on('error', (error) => {
            this.logger.error('❌ MongoDB connection error:', error.message);
        });
    }
    checkConnection() {
        try {
            if (this.connection.readyState === 1) {
                this.logger.log('✅ MongoDB connected successfully');
            }
            else {
                this.logger.warn(`⚠️ MongoDB connection state: ${this.getReadyStateText(this.connection.readyState)}`);
            }
        }
        catch (error) {
            this.logger.error('❌ Failed to check MongoDB connection:', error.message);
        }
    }
    getReadyStateText(state) {
        switch (state) {
            case 0: return 'disconnected';
            case 1: return 'connected';
            case 2: return 'connecting';
            case 3: return 'disconnecting';
            default: return 'unknown';
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Connection !== "undefined" && mongoose_1.Connection) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _b : Object])
], DatabaseService);


/***/ }),

/***/ "./src/shared/services/date.service.ts":
/*!*********************************************!*\
  !*** ./src/shared/services/date.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let DateService = class DateService {
    getCurrentDate() {
        return new Date();
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    calculateLeadTime(startDate, endDate) {
        return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);


/***/ }),

/***/ "./src/shared/services/logger.service.ts":
/*!***********************************************!*\
  !*** ./src/shared/services/logger.service.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LoggerService = class LoggerService extends common_1.Logger {
    constructor() {
        super();
    }
    setContext(context) {
        this.context = context;
    }
    error(message, trace, context) {
        super.error(message, trace, context || this.context);
    }
    warn(message, context) {
        super.warn(message, context || this.context);
    }
    log(message, context) {
        super.log(message, context || this.context);
    }
    debug(message, context) {
        super.debug(message, context || this.context);
    }
    verbose(message, context) {
        super.verbose(message, context || this.context);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);


/***/ }),

/***/ "./src/shared/services/validation.service.ts":
/*!***************************************************!*\
  !*** ./src/shared/services/validation.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ValidationService = class ValidationService {
    isPositiveNumber(value) {
        return typeof value === 'number' && value > 0;
    }
    isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);


/***/ }),

/***/ "./src/shared/shared.module.ts":
/*!*************************************!*\
  !*** ./src/shared/shared.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const date_service_1 = __webpack_require__(/*! ./services/date.service */ "./src/shared/services/date.service.ts");
const validation_service_1 = __webpack_require__(/*! ./services/validation.service */ "./src/shared/services/validation.service.ts");
const database_service_1 = __webpack_require__(/*! ./services/database.service */ "./src/shared/services/database.service.ts");
const logger_service_1 = __webpack_require__(/*! ./services/logger.service */ "./src/shared/services/logger.service.ts");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            date_service_1.DateService,
            validation_service_1.ValidationService,
            database_service_1.DatabaseService,
            logger_service_1.LoggerService
        ],
        exports: [
            date_service_1.DateService,
            validation_service_1.ValidationService,
            database_service_1.DatabaseService,
            logger_service_1.LoggerService
        ],
    })
], SharedModule);


/***/ }),

/***/ "./src/shared/utils/error.utils.ts":
/*!*****************************************!*\
  !*** ./src/shared/utils/error.utils.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidEntityError = exports.EntityNotFoundError = void 0;
exports.throwIfNotFound = throwIfNotFound;
exports.throwIfInvalid = throwIfInvalid;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class EntityNotFoundError extends common_1.NotFoundException {
    constructor(entityName, id) {
        super(`${entityName} with ID ${id} not found`);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class InvalidEntityError extends common_1.BadRequestException {
    constructor(message) {
        super(message);
    }
}
exports.InvalidEntityError = InvalidEntityError;
function throwIfNotFound(result, entityName, id) {
    if (!result) {
        throw new EntityNotFoundError(entityName, id);
    }
    return result;
}
function throwIfInvalid(condition, message) {
    if (!condition) {
        throw new InvalidEntityError(message);
    }
}


/***/ }),

/***/ "./src/shared/utils/mongoose.utils.ts":
/*!********************************************!*\
  !*** ./src/shared/utils/mongoose.utils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findOneOrThrow = findOneOrThrow;
exports.updateOneOrThrow = updateOneOrThrow;
exports.deleteOneOrThrow = deleteOneOrThrow;
exports.findManyOrEmpty = findManyOrEmpty;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function findOneOrThrow(promise, id, entityName) {
    const result = await promise;
    if (!result) {
        throw new common_1.NotFoundException(`${entityName} with ID ${id} not found`);
    }
    return result;
}
async function updateOneOrThrow(promise, id, entityName) {
    const result = await promise;
    if (!result) {
        throw new common_1.NotFoundException(`${entityName} with ID ${id} not found`);
    }
    return result;
}
async function deleteOneOrThrow(promise, id, entityName) {
    const result = await promise;
    if (!result) {
        throw new common_1.NotFoundException(`${entityName} with ID ${id} not found`);
    }
    return result;
}
async function findManyOrEmpty(promise) {
    const results = await promise;
    return results || [];
}


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const logger_service_1 = __webpack_require__(/*! ./shared/services/logger.service */ "./src/shared/services/logger.service.ts");
const swagger_config_1 = __webpack_require__(/*! ./config/swagger.config */ "./src/config/swagger.config.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        cors: true
    });
    const logger = app.get(logger_service_1.LoggerService);
    app.useLogger(logger);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }));
    (0, swagger_config_1.setupSwagger)(app);
    app.setGlobalPrefix('api');
    const port = configService.get('app.port', 3000);
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
    logger.log(`📚 API Documentation available at: http://localhost:${port}/api`);
}
bootstrap().catch((error) => {
    console.error('❌ Application failed to start:', error);
    process.exit(1);
});

})();

/******/ })()
;