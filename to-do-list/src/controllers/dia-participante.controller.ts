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
Participante,
} from '../models';
import {DiaRepository} from '../repositories';

export class DiaParticipanteController {
  constructor(
    @repository(DiaRepository) protected diaRepository: DiaRepository,
  ) { }

  @get('/dias/{id}/participantes', {
    responses: {
      '200': {
        description: 'Array of Dia has many Participante through Tarefa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Participante>,
  ): Promise<Participante[]> {
    return this.diaRepository.participantes(id).find(filter);
  }

  @post('/dias/{id}/participantes', {
    responses: {
      '200': {
        description: 'create a Participante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Participante)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Dia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participante, {
            title: 'NewParticipanteInDia',
            exclude: ['id'],
          }),
        },
      },
    }) participante: Omit<Participante, 'id'>,
  ): Promise<Participante> {
    return this.diaRepository.participantes(id).create(participante);
  }

  @patch('/dias/{id}/participantes', {
    responses: {
      '200': {
        description: 'Dia.Participante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participante, {partial: true}),
        },
      },
    })
    participante: Partial<Participante>,
    @param.query.object('where', getWhereSchemaFor(Participante)) where?: Where<Participante>,
  ): Promise<Count> {
    return this.diaRepository.participantes(id).patch(participante, where);
  }

  @del('/dias/{id}/participantes', {
    responses: {
      '200': {
        description: 'Dia.Participante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Participante)) where?: Where<Participante>,
  ): Promise<Count> {
    return this.diaRepository.participantes(id).delete(where);
  }
}
