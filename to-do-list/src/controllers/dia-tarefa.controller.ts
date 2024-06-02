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
  Dia,
  Tarefa,
} from '../models';
import {DiaRepository} from '../repositories';

export class DiaTarefaController {
  constructor(
    @repository(DiaRepository) protected diaRepository: DiaRepository,
  ) { }

  @get('/dias/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Array of Dia has many Tarefa',
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
    return this.diaRepository.tarefas(id).find(filter);
  }

  @post('/dias/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Dia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarefa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Dia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {
            title: 'NewTarefaInDia',
            exclude: ['id'],
            optional: ['diaId']
          }),
        },
      },
    }) tarefa: Omit<Tarefa, 'id'>,
  ): Promise<Tarefa> {
    return this.diaRepository.tarefas(id).create(tarefa);
  }

  @patch('/dias/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Dia.Tarefa PATCH success count',
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
    return this.diaRepository.tarefas(id).patch(tarefa, where);
  }

  @del('/dias/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Dia.Tarefa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.diaRepository.tarefas(id).delete(where);
  }
}
