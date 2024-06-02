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
import {Participante} from '../models';
import {ParticipanteRepository} from '../repositories';

export class ParticipanteController {
  constructor(
    @repository(ParticipanteRepository)
    public participanteRepository : ParticipanteRepository,
  ) {}

  @post('/participantes')
  @response(200, {
    description: 'Participante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Participante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participante, {
            title: 'NewParticipante',
            exclude: ['id'],
          }),
        },
      },
    })
    participante: Omit<Participante, 'id'>,
  ): Promise<Participante> {
    return this.participanteRepository.create(participante);
  }

  @get('/participantes/count')
  @response(200, {
    description: 'Participante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Participante) where?: Where<Participante>,
  ): Promise<Count> {
    return this.participanteRepository.count(where);
  }

  @get('/participantes')
  @response(200, {
    description: 'Array of Participante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Participante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Participante) filter?: Filter<Participante>,
  ): Promise<Participante[]> {
    return this.participanteRepository.find(filter);
  }

  @patch('/participantes')
  @response(200, {
    description: 'Participante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participante, {partial: true}),
        },
      },
    })
    participante: Participante,
    @param.where(Participante) where?: Where<Participante>,
  ): Promise<Count> {
    return this.participanteRepository.updateAll(participante, where);
  }

  @get('/participantes/{id}')
  @response(200, {
    description: 'Participante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Participante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Participante, {exclude: 'where'}) filter?: FilterExcludingWhere<Participante>
  ): Promise<Participante> {
    return this.participanteRepository.findById(id, filter);
  }

  @patch('/participantes/{id}')
  @response(204, {
    description: 'Participante PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participante, {partial: true}),
        },
      },
    })
    participante: Participante,
  ): Promise<void> {
    await this.participanteRepository.updateById(id, participante);
  }

  @put('/participantes/{id}')
  @response(204, {
    description: 'Participante PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participante: Participante,
  ): Promise<void> {
    await this.participanteRepository.replaceById(id, participante);
  }

  @del('/participantes/{id}')
  @response(204, {
    description: 'Participante DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participanteRepository.deleteById(id);
  }
}
