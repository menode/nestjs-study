import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserController } from './modules/user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoCfg from './common/config/db.cfg';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: mongoCfg,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      ignoreEnvFile: false,
    }),
    UserModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
