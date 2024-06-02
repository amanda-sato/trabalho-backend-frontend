import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tarefa, TarefaRelations, Dia, Participante} from '../models';
import {DiaRepository} from './dia.repository';
import {ParticipanteRepository} from './participante.repository';

export class TarefaRepository extends DefaultCrudRepository<
  Tarefa,
  typeof Tarefa.prototype.id,
  TarefaRelations
> {

  public readonly dia: BelongsToAccessor<Dia, typeof Tarefa.prototype.id>;

  public readonly participante: BelongsToAccessor<Participante, typeof Tarefa.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DiaRepository') protected diaRepositoryGetter: Getter<DiaRepository>, @repository.getter('ParticipanteRepository') protected participanteRepositoryGetter: Getter<ParticipanteRepository>,
  ) {
    super(Tarefa, dataSource);
    this.participante = this.createBelongsToAccessorFor('participante', participanteRepositoryGetter,);
    this.registerInclusionResolver('participante', this.participante.inclusionResolver);
    this.dia = this.createBelongsToAccessorFor('dia', diaRepositoryGetter,);
    this.registerInclusionResolver('dia', this.dia.inclusionResolver);
  }
}
