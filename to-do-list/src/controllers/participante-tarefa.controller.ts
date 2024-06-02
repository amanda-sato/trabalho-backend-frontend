import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Participante,
  Tarefa,
} from '../models';
import {ParticipanteRepository} from '../repositories';

export class ParticipanteTarefaController {
  constructor(
    @repository(ParticipanteRepository) protected participanteRepository: ParticipanteRepository,
  ) { }

  @get('/participantes/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Array of Participante has many Tarefa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarefa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tarefa>,
  ): Promise<Tarefa[]> {
    return this.participanteRepository.tarefas(id).find(filter);
  }

  @post('/participantes/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Participante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarefa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Participante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {
            title: 'NewTarefaInParticipante',
            exclude: ['id'],
            optional: ['participanteId']
          }),
        },
      },
    }) tarefa: Omit<Tarefa, 'id'>,
  ): Promise<Tarefa> {
    return this.participanteRepository.tarefas(id).create(tarefa);
  }

  @patch('/participantes/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Participante.Tarefa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {partial: true}),
        },
      },
    })
    tarefa: Partial<Tarefa>,
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.participanteRepository.tarefas(id).patch(tarefa, where);
  }

  @del('/participantes/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Participante.Tarefa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.participanteRepository.tarefas(id).delete(where);
  }
}
