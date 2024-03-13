import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Accounts]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwe',
      database: 'minta',
      models: [Accounts],
      autoLoadModels: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
