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
Dia,
} from '../models';
import {ParticipanteRepository} from '../repositories';

export class ParticipanteDiaController {
  constructor(
    @repository(ParticipanteRepository) protected participanteRepository: ParticipanteRepository,
  ) { }

  @get('/participantes/{id}/dias', {
    responses: {
      '200': {
        description: 'Array of Participante has many Dia through Tarefa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Dia>,
  ): Promise<Dia[]> {
    return this.participanteRepository.dias(id).find(filter);
  }

  @post('/participantes/{id}/dias', {
    responses: {
      '200': {
        description: 'create a Dia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dia)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Participante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dia, {
            title: 'NewDiaInParticipante',
            exclude: ['id'],
          }),
        },
      },
    }) dia: Omit<Dia, 'id'>,
  ): Promise<Dia> {
    return this.participanteRepository.dias(id).create(dia);
  }

  @patch('/participantes/{id}/dias', {
    responses: {
      '200': {
        description: 'Participante.Dia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dia, {partial: true}),
        },
      },
    })
    dia: Partial<Dia>,
    @param.query.object('where', getWhereSchemaFor(Dia)) where?: Where<Dia>,
  ): Promise<Count> {
    return this.participanteRepository.dias(id).patch(dia, where);
  }

  @del('/participantes/{id}/dias', {
    responses: {
      '200': {
        description: 'Participante.Dia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Dia)) where?: Where<Dia>,
  ): Promise<Count> {
    return this.participanteRepository.dias(id).delete(where);
  }
}
