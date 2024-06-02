import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tarefa,
  Dia,
} from '../models';
import {TarefaRepository} from '../repositories';

export class TarefaDiaController {
  constructor(
    @repository(TarefaRepository)
    public tarefaRepository: TarefaRepository,
  ) { }

  @get('/tarefas/{id}/dia', {
    responses: {
      '200': {
        description: 'Dia belonging to Tarefa',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dia),
          },
        },
      },
    },
  })
  async getDia(
    @param.path.number('id') id: typeof Tarefa.prototype.id,
  ): Promise<Dia> {
    return this.tarefaRepository.dia(id);
  }
}
