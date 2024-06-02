import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dia, DiaRelations, Tarefa, Participante} from '../models';
import {TarefaRepository} from './tarefa.repository';
import {ParticipanteRepository} from './participante.repository';

export class DiaRepository extends DefaultCrudRepository<
  Dia,
  typeof Dia.prototype.id,
  DiaRelations
> {

  public readonly tarefas: HasManyRepositoryFactory<Tarefa, typeof Dia.prototype.id>;

  public readonly participantes: HasManyThroughRepositoryFactory<Participante, typeof Participante.prototype.id,
          Tarefa,
          typeof Dia.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TarefaRepository') protected tarefaRepositoryGetter: Getter<TarefaRepository>, @repository.getter('ParticipanteRepository') protected participanteRepositoryGetter: Getter<ParticipanteRepository>,
  ) {
    super(Dia, dataSource);
    this.participantes = this.createHasManyThroughRepositoryFactoryFor('participantes', participanteRepositoryGetter, tarefaRepositoryGetter,);
    this.registerInclusionResolver('participantes', this.participantes.inclusionResolver);
    this.tarefas = this.createHasManyRepositoryFactoryFor('tarefas', tarefaRepositoryGetter,);
    this.registerInclusionResolver('tarefas', this.tarefas.inclusionResolver);
  }
}
