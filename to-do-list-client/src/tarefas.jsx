import { useMediaQuery } from "@mui/material";
import {
    Datagrid,
    DateField,
    AutocompleteInput,
    List,
    BooleanField,
    BooleanInput,
    ReferenceInput,
    NumberField,
    TextInput,
    EditButton,
    ReferenceField,
    SimpleList,
    TextField,
    Edit,
    SimpleForm,
    NumberInput,
    useRecordContext,
    Create
} from 'react-admin';


const TarefaFilters = [
    <TextInput source="descricao" label="Procurar Tarefa" alwaysOn/>,
    <TextInput source="prioridade" label="Procurar Por Prioridade"/>,
    <BooleanInput source="concluida" label="Procurar por Conclusão"/>,
    <TextInput source="horario" label="Procurar por Horário"/>,
    <NumberInput source="id" label="Procurar por Id"/>,
    <ReferenceInput source="diaId" label="Procurar por Dia" reference="dias"/>,
    <ReferenceInput source="participanteId" label="Procurar por Participante" reference="participantes"/>
]


export const TarefaList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return(
        <List filters={TarefaFilters}>
            {isSmall?(
            <SimpleList
                primaryText={(record) => record.id}
                secondaryText={(record) => record.descricao}
                tertiaryText={(record) => record.concluida}

            />):
            (<Datagrid rowClick="edit">
                {/*<TextField source="id"/>*/}
                <NumberField source="id"/>
                <TextField source="descricao"/>
                <BooleanField source="concluida"/>
                <TextField source = "horario"/>
                <TextField source = "prioridade"/>
                <ReferenceField source = "diaId" reference="dias">
                    <DateField source="data" />
                </ReferenceField>
                <ReferenceField source = "participanteId" reference="participantes">
                    <TextField source="nome" />
                </ReferenceField>
                <EditButton/>
            </Datagrid>
            )}
        </List>
    );
};

const TarefaTitle = () => {
    const record=useRecordContext();
    return <span>Tarefa {record? `"${record.descricao}"` : ''}</span>
};

export const TarefaEdit = () => (
    <Edit title={<TarefaTitle />}>
        <SimpleForm>
            <NumberInput source="id" disabled/>
            <TextInput source="descricao"/>
            <BooleanInput source="concluida"/>
            <TextInput source = "horario"/>
            <TextInput source = "prioridade"/>
            <ReferenceInput source = "diaId" reference="dias">
                <AutocompleteInput optionText="data" />
            </ReferenceInput>
            <ReferenceInput source = "participanteId" reference="participantes">
                <AutocompleteInput optionText="nome" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const TarefaCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" disabled/>
            <TextInput source="descricao"/>
            <BooleanInput source="concluida"/>
            <TextInput source = "horario"/>
            <TextInput source = "prioridade"/>
            <ReferenceInput source = "diaId" reference="dias"/>
            <ReferenceInput source = "participanteId" reference="participantes"/>
        </SimpleForm>
    </Create>
);


