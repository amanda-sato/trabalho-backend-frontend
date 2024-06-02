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
  Participante,
} from '../models';
import {TarefaRepository} from '../repositories';

export class TarefaParticipanteController {
  constructor(
    @repository(TarefaRepository)
    public tarefaRepository: TarefaRepository,
  ) { }

  @get('/tarefas/{id}/participante', {
    responses: {
      '200': {
        description: 'Participante belonging to Tarefa',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Participante),
          },
        },
      },
    },
  })
  async getParticipante(
    @param.path.number('id') id: typeof Tarefa.prototype.id,
  ): Promise<Participante> {
    return this.tarefaRepository.participante(id);
  }
}
