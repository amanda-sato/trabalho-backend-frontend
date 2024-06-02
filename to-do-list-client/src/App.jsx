import { Admin, Resource } from 'react-admin';
import { DiaList , DiaEdit, DiaCreate} from './dias';
import { TarefaList , TarefaEdit, TarefaCreate } from './tarefas';
import { ParticipanteList, ParticipanteEdit, ParticipanteCreate } from './participantes';
import lb4Provider from './data-provider';
import './App.css'

const dataProvider = lb4Provider('http://localhost:3000', () => {}, "id");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="dias" list={DiaList} edit={DiaEdit} create={DiaCreate}/>
    <Resource name="tarefas" list={TarefaList} edit={TarefaEdit} create={TarefaCreate}/>
    <Resource name="participantes" list={ParticipanteList} edit={ParticipanteEdit} create={ParticipanteCreate}/>
  </Admin>
);



export default App
