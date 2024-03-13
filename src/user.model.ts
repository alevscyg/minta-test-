import { Column, Model, DataType, Table } from 'sequelize-typescript';

@Table({tableName: "accounts", createdAt: false, updatedAt: false})
export class Accounts extends Model {
    @Column({type: DataType.STRING,autoIncrement: false, primaryKey: true,unique: true})
    id: string;

    @Column({type: DataType.STRING(100), unique: true, allowNull: false})
    email:string;

    @Column({type: DataType.STRING(100),allowNull: false})
    name:string;

    @Column({type: DataType.STRING(100),allowNull: true})
    number:string;

    @Column({type: DataType.STRING(5)})
    status:string;
}