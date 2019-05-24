import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Coor{
    @ObjectIdColumn ()
    id: ObjectID;
    @Column()
    lat:number;
    @Column()
    lng:number
}
