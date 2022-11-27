import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany} from "typeorm";

@Entity()
class User {


    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nickname:string

    @Column()
    email:string

    @Column()
    password:string

    @OneToOne(()=>BanInfo, (ban)=>ban.user)
    ban:BanInfo

    @Column()
    activation:boolean

    @OneToMany(()=>SubIM, (subIM)=>subIM.user)
    subIM:SubIM[]

    @Column()
    role:string
}

@Entity()
class BanInfo{
    @OneToOne(()=>User, (user)=>user.ban)
    user:User
}

class SubIM{
    @ManyToOne(()=>User, (user)=>user.ban)
    user:User
}