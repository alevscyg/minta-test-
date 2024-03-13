import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAccountCommand } from './dto/open-account.command';
import { Account } from './dto/create.account';
import { NotificationService } from './dto/notification.service';
import { AccountError } from './dto/account.error';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './user.model';
import { AccountManager } from './dto/account.manager';
import { CloseAccountCommand } from './dto/close-account.command';


describe('AppController', () => {
  let appController: AppController;
  
  

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[SequelizeModule.forFeature([Accounts]),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'qwe',
        database: 'minta',
        models: [Accounts],
        autoLoadModels: true
      }),],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  //////// Open Account ///////////////////////////////////////////////////////////////////////////////////////////////

  test('Should successfully open a personal account', async() => {            
    const command = new OpenAccountCommand();
    command.email = "customer1@domain.ru";
    command.name = "Ярославцев Николай Сереевич";

    const account = await appController.openAccount(command);

    expect(account).toBeInstanceOf(Account);
    expect(account).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "customer1@domain.ru",
        name: "Ярославцев Николай Сереевич",
        number: expect.any(String),
        status: "Open"
      })
    );
  });
  
  test('Should throw an error for empty name', async () => {
    try {
      const command = new OpenAccountCommand();
      command.email = "customer1@domain.ru";

      const account = await appController.openAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });


  test('Should throw an error for empty email address', async () => {
    try {
      const command = new OpenAccountCommand();
      command.name = "Костюшин Дмитрий Анатольевич";

      const account = await appController.openAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });


  test('Should throw an error for incorrect email address', async () => {
    try {
      const command = new OpenAccountCommand();
      command.name = "Костюшин Дмитрий Анатольевич";
      command.email = "domain.ru";

      const account = await appController.openAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });



  //////// Close Account  ///////////////////////////////////////////////////////////////////////////////////////////////

  test('Should successfully close a personal account', async() => {
    const command = new CloseAccountCommand();
    command.id = "123-456-789";

    const account = await appController.closeAccount(command);

    expect(account).toBeInstanceOf(Account);
    expect(account).toEqual(
      expect.objectContaining({
        id: "123-456-789",
        email: "customer0919@domain.ru",
        name: "Пугачева Ольга Сергеевна",
        number: expect.any(String),
        status: "Close"
      })
    );
  });

  test('Should throw an error for an already closed account', async () => {
    try {
      const command = new CloseAccountCommand();
      command.id = "231-545-16-01";

      const account = await appController.closeAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });

  test('Should throw an error for non-existing account', async () => {
    try {
      const command = new CloseAccountCommand();
      command.id = "101-101-11-01";

      const account = await appController.closeAccount(command);
    } catch (e) {
      expect(e).toBeInstanceOf(AccountError);
    }
  });
});