import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
    export class User{
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

        @Column()
        lastName: string;
       
        @Column()
        age: Int16Array;

        @Column()
        telephone: Int16Array;
        
        @Column()
        email: string;

        @Column({default: false})
        admin: boolean;

        @Column()
        appNotification: boolean;

        @Column()
        emailNotification: boolean;
        
        @Column()
        intercomNotification: boolean;
    }
