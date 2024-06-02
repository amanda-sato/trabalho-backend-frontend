import {Entity, hasMany, model, property} from '@loopback/repository';
import {Tarefa} from './tarefa.model';
import {Participante} from './participante.model';

@model()
export class Dia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'string',
  })
  dia: string; // Mantenha apenas a propriedade "dia"

  @hasMany(() => Tarefa)
  tarefas: Tarefa[];

  @hasMany(() => Participante, {through: {model: () => Tarefa}})
  participantes: Participante[];

  constructor(data?: Partial<Dia>) {
    super(data);
  }
}

export interface DiaRelations {
  // Descreva propriedades de navegação aqui
}

export type DiaWithRelations = Dia & DiaRelations;
