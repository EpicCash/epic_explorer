import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('peer_ip', { schema: 'public' })
  export class PeerIp {
    @PrimaryGeneratedColumn({
      type: 'integer',
      name: 'id',
    })
    Id: number;

    @Column('character varying', {
      nullable: false,
      primary: true,
      length: 142,
      name: 'ip',
    })
    IpAddress: string;

    @Column('character varying', {
      nullable: false,
      length: 142,
      name: 'longitude',
    })
    Longitude: string;

    @Column('character varying', {
        nullable: false,
        length: 142,
        name: 'latitude',
    })
    Latitude: string;

  }
