import { useMediaQuery } from "@mui/material";

import { 
    Datagrid,
    DateField,
    DateTimeInput,
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
    DateInput
} from 'react-admin';

const DiaFilters = [
    <DateInput
        source="data" 
        label="Procurar Data"
        alwaysOn
    />,
    <TextInput source="dia" label="Procurar por Dia"/>,
    <NumberInput source="id" label="Procurar por Id"/>
]

export const DiaList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return(
        <List filters={DiaFilters}>
            {isSmall?(
            <SimpleList 
                primaryText={(record) => record.id}
                secondaryText={(record) => record.data}
                tertiaryText={(record) => record.dia}
            />):
            (<Datagrid rowClick="edit">
                <NumberField source="id"/>
                <DateField source="data" showTime={true}/>
                <TextField source="dia"/>
                <EditButton/>
            </Datagrid>
            )}
        </List>
    );

};

const DiaTitle = () => {
    const record=useRecordContext();
    return <span>Data {record? `"${record.data}"` : ''}</span>
};

export const DiaEdit = () => (
    <Edit title={<DiaTitle />}>
        <SimpleForm>
            <NumberInput source="id" disabled/>
            <DateTimeInput source="data"/>
            <TextInput source="dia"/>
        </SimpleForm>
    </Edit>
);


export const DiaCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" disabled/>
            <DateTimeInput source="data"/>
            <TextInput source="dia"/>
        </SimpleForm>
    </Create>
);