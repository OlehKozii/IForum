import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import {IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export enum UserRole{
    ADMIN="admin",
    MODERATOR="moderator",
    CUSTOMER="customer"
}

export class BanInfo{

    @Column({
        default:false
    })
    baned:boolean

    @Column()
    banReason?:string
}
////////////////////////////////////////////////////////////////////////////

@Entity('user')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id:number

    @Column({
        unique:true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    nickname:string

    @Column({
        unique:true,
        update:false
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @Column()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password:string

    @Column({
        unique:true,
        default:null
    })
    @IsString()
    refresh_token:string

    @Column({
        type:"json",
        default:null
    })
    ban?:BanInfo

    @Column({
        default:false
    })
    @IsBoolean()
    activation:boolean

    // @Column((type)=>SubIM)
    // subIM?:SubIM[]

    @Column({
        type:"enum",
        enum:UserRole,
        default:UserRole.CUSTOMER
    })
    role:UserRole
}
/////////////////////////////////////////////////////////////////////



class SubIM{

    @Column()
    subi:string

    @Column({
        type:"enum",
        enum:UserRole,
        default:UserRole.CUSTOMER
    })
    subrole:UserRole

}



