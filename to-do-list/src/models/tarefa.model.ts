import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Dia} from './dia.model';
import {Participante} from './participante.model';

@model()
export class Tarefa extends Entity {
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
  descricao: string;

  @property({
    type: 'boolean',
  })
  concluida?: boolean;

  @property({
    type: 'string',
  })
  horario?: string;

  @property({
    type: 'string',
  })
  prioridade?: string;

  @belongsTo(() => Dia)
  diaId: number;

  @belongsTo(() => Participante)
  participanteId: number;

  constructor(data?: Partial<Tarefa>) {
    super(data);
  }
}

export interface TarefaRelations {
  // describe navigational properties here
}

export type TarefaWithRelations = Tarefa & TarefaRelations;
