import {Entity, model, property, hasMany} from '@loopback/repository';
import {Dia} from './dia.model';
import {Tarefa} from './tarefa.model';

@model()
export class Participante extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @hasMany(() => Dia, {through: {model: () => Tarefa}})
  dias: Dia[];

  @hasMany(() => Tarefa)
  tarefas: Tarefa[];

  constructor(data?: Partial<Participante>) {
    super(data);
  }
}

export interface ParticipanteRelations {
  // describe navigational properties here
}

export type ParticipanteWithRelations = Participante & ParticipanteRelations;
