import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Accounts } from './user.model';
import { Account } from './dto/create.account';
import { CloseAccountCommand } from './dto/close-account.command';
import { OpenAccountCommand } from './dto/open-account.command';

@Injectable()
export class AppService {
  constructor(@InjectModel(Accounts) private accountRepository:typeof Accounts){}

  async openAccount(dto: OpenAccountCommand){
    if(dto.email === undefined || dto.name === undefined){
      throw new Error(`Поле эл.почты и имени не может быть пустым`)
    }
    const account = await this.accountRepository.findOne({where:{email:dto.email}})
    if(account!=undefined){
      account.status = "Open"
      account.save()
      return await account
    }
    else{
      var uniqid = require('uniqid');
      const id = uniqid(dto.email)
      const number = uniqid()
      return await this.accountRepository.create({id:id,email:dto.email,name:dto.name,number:number,status: "Open"})
    }
  }
  async closeAccount(dto: CloseAccountCommand){
    const account = await this.accountRepository.findByPk(dto.id)
    if(account===undefined){
      throw new Error(`Учетной записи не существует`)
    }
    if(account.status==="Close"){
      throw new Error(`Аккаунт с id ${dto.id} уже закрыт`)
    }
    else{
      account.status = "Close"
      account.save()
      return await account
    }
  }


  async getAccounts(){
    return await this.accountRepository.findAll()
  }
}
