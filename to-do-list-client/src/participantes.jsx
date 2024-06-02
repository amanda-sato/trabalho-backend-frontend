import { useMediaQuery } from "@mui/material";
import {
    Datagrid,
    SingleFieldList,
    WrapperField,
    ReferenceField,
    DateField,
    List,
    NumberField,
    TextInput,
    EditButton,
    SimpleList,
    TextField,
    Edit,
    SimpleForm,
    NumberInput,
    useRecordContext,
    Create,
    ReferenceManyField
} from 'react-admin';



const ParticipanteFilters = [
    <TextInput source="nome" label="Procurar por Nome" alwaysOn/>,
    <NumberInput source="id" label="Procurar por Id"/>
]

export const ParticipanteList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return(
        <List filters={ParticipanteFilters}>
            {isSmall?(
            <SimpleList 
                primaryText={(record) => record.id}
                secondaryText={(record) => record.nome}
            />):
            (<Datagrid rowClick="edit">
                <NumberField source="id"/>
                <TextField source="nome"/>
                <ReferenceManyField reference="tarefas" target="participanteId" label="tarefas">
                    <Datagrid>
                        <ReferenceField source="id" reference="tarefas" label="Tarefa">
                            <TextField source="descricao" />
                        </ReferenceField>
                        
                        <ReferenceField source = "diaId" reference="dias">
                            <DateField source="data" />
                        </ReferenceField>
                    </Datagrid>
                </ReferenceManyField>
                <EditButton/>
                </Datagrid>
            )}
        </List>
    );
};

const ParticipanteTitle = () => {
    const record=useRecordContext();
    return <span>Participante {record? `"${record.nome}"` : ''}</span>
};

export const ParticipanteEdit = () => (
    <Edit title={<ParticipanteTitle />}>
        <SimpleForm>
            <NumberInput source="id" disabled/>
            <TextInput source="nome"/>
        </SimpleForm>
    </Edit>
);


export const ParticipanteCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" disabled/>
            <TextInput source="nome"/>
        </SimpleForm>
    </Create>
);