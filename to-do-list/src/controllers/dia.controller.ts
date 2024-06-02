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
import {Dia} from '../models';
import {DiaRepository} from '../repositories';

export class DiaController {
  constructor(
    @repository(DiaRepository)
    public diaRepository : DiaRepository,
  ) {}

  @post('/dias')
  @response(200, {
    description: 'Dia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dia, {
            title: 'NewDia',
            exclude: ['id'],
          }),
        },
      },
    })
    dia: Omit<Dia, 'id'>,
  ): Promise<Dia> {
    return this.diaRepository.create(dia);
  }

  @get('/dias/count')
  @response(200, {
    description: 'Dia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dia) where?: Where<Dia>,
  ): Promise<Count> {
    return this.diaRepository.count(where);
  }

  @get('/dias')
  @response(200, {
    description: 'Array of Dia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dia) filter?: Filter<Dia>,
  ): Promise<Dia[]> {
    return this.diaRepository.find(filter);
  }

  @patch('/dias')
  @response(200, {
    description: 'Dia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dia, {partial: true}),
        },
      },
    })
    dia: Dia,
    @param.where(Dia) where?: Where<Dia>,
  ): Promise<Count> {
    return this.diaRepository.updateAll(dia, where);
  }

  @get('/dias/{id}')
  @response(200, {
    description: 'Dia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Dia, {exclude: 'where'}) filter?: FilterExcludingWhere<Dia>
  ): Promise<Dia> {
    return this.diaRepository.findById(id, filter);
  }

  @patch('/dias/{id}')
  @response(204, {
    description: 'Dia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dia, {partial: true}),
        },
      },
    })
    dia: Dia,
  ): Promise<void> {
    await this.diaRepository.updateById(id, dia);
  }

  @put('/dias/{id}')
  @response(204, {
    description: 'Dia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dia: Dia,
  ): Promise<void> {
    await this.diaRepository.replaceById(id, dia);
  }

  @del('/dias/{id}')
  @response(204, {
    description: 'Dia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.diaRepository.deleteById(id);
  }
}
