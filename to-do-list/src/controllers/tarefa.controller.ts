import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tarefa} from '../models';
import {TarefaRepository} from '../repositories';

export class TarefaController {
  constructor(
    @repository(TarefaRepository)
    public tarefaRepository : TarefaRepository,
  ) {}

  @post('/tarefas')
  @response(200, {
    description: 'Tarefa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarefa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {
            title: 'NewTarefa',
            exclude: ['id'],
          }),
        },
      },
    })
    tarefa: Omit<Tarefa, 'id'>,
  ): Promise<Tarefa> {
    return this.tarefaRepository.create(tarefa);
  }

  @get('/tarefas/count')
  @response(200, {
    description: 'Tarefa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarefa) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.tarefaRepository.count(where);
  }

  @get('/tarefas')
  @response(200, {
    description: 'Array of Tarefa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarefa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarefa) filter?: Filter<Tarefa>,
  ): Promise<Tarefa[]> {
    return this.tarefaRepository.find(filter);
  }

  @patch('/tarefas')
  @response(200, {
    description: 'Tarefa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {partial: true}),
        },
      },
    })
    tarefa: Tarefa,
    @param.where(Tarefa) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.tarefaRepository.updateAll(tarefa, where);
  }

  @get('/tarefas/{id}')
  @response(200, {
    description: 'Tarefa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarefa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tarefa, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarefa>
  ): Promise<Tarefa> {
    return this.tarefaRepository.findById(id, filter);
  }

  @patch('/tarefas/{id}')
  @response(204, {
    description: 'Tarefa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {partial: true}),
        },
      },
    })
    tarefa: Tarefa,
  ): Promise<void> {
    await this.tarefaRepository.updateById(id, tarefa);
  }

  @put('/tarefas/{id}')
  @response(204, {
    description: 'Tarefa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tarefa: Tarefa,
  ): Promise<void> {
    await this.tarefaRepository.replaceById(id, tarefa);
  }

  @del('/tarefas/{id}')
  @response(204, {
    description: 'Tarefa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tarefaRepository.deleteById(id);
  }
}
