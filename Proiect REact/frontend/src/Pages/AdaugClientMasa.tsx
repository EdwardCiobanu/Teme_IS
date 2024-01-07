import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from './table.png'
import background from './fundal.jpg'
import {InputAdornment} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";

interface Mese {
    id: number;
    nrLocuri: number;
}

interface Persoane {
    id: number;
    age: number;
    nume: string;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'nrLocuri',
        headerName: 'Numar de Locuri',
        type: 'number',
        width: 150,
        editable: true,
    },
];

const columnsPerson: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'age',
        headerName: 'Varsta',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'nume',
        headerName: 'Full name',
        width: 150,
        editable: true,
    },
];


export default function AdaugClientMasa() {


    const navigate = useNavigate();

    const [mese, setMese] = useState<Mese[]>([]);
    const [selectedMasa, setSelectedMasa] = React.useState<Mese | null>(null);

    const [persons, setPersons] = useState<Persoane[]>([]);
    const [selectedPerson, setSelectedPerson] = React.useState<Persoane | null>(null);
    const [selectedPersons, setSelectedPersons] = React.useState<Persoane[] | null>([]);


    useEffect(() => {
        axios.get('http://localhost:8080/Person/FindAll')
            .then((response) => {
                setPersons(response.data);
            })
            .catch((error) => {
                console.error('Error fetching persons:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/Masa/FindAll')
            .then((response) => {
                setMese(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tables:', error);
            });
    }, []);

    const handleSelectionChangeMasa = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const   selectedMasaId = selectionModel[0];
            const masa = mese.find((m) => m.id === selectedMasaId) || null;
            setSelectedMasa(masa);
            console.log("Selected table", masa);
        } else {
            setSelectedMasa(null);
            console.log("No row selected");
        }
    };

    const handleSelectionChangePersons = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const selectedPersonsIds = selectionModel;
            const selectedPersonsList = selectedPersonsIds.map((selectedPersonId: any) => {
                return persons.find((p) => p.id === selectedPersonId) || null;
            });

            setSelectedPersons(selectedPersonsList);
            console.log("Selected persons", selectedPersonsList);
        } else {
            setSelectedPersons([]);
            console.log("No row selected");
        }
    };

    const handleSelectionChangePerson = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const selectedPersonId = selectionModel[0];
            const person = persons.find((p) => p.id === selectedPersonId) || null;
            setSelectedPerson(person);
            console.log("Selected person", person);
        } else {
            setSelectedPerson(null);
            console.log("No row selected");
        }
    };


    const onUpdateSelected = (event: any): void => {
        console.log(selectedPersons)
        console.log(selectedMasa)
        // if(nume.length != 0)
        const person = {
            masa: selectedMasa,
            persons: selectedPersons,
        }
        if(selectedPersons != null && selectedMasa != null) {
            axios.post("http://localhost:8080/Masa/UpdateMasaPerson", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedMasa(null);
                axios.get('http://localhost:8080/Masa/FindAll')
                    .then((response) => {
                        setMese(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching tables:', error);
                    });
                //console.log(response)
                //alert(response.data);
                setSelectedPersons(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Can't add client to multiple tables`);
            })
        }
        else{
            const masa = {
                id: 0,
                nrLocuri: 0,
            }
            const person = {
                id: 0,
                age: 0,
                nume: "",
            }
            axios.post("http://localhost:8080/Masa/UpdateMasaPerson", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedMasa(null);
                axios.get('http://localhost:8080/Masa/FindAll')
                    .then((response) => {
                        setMese(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching tables:', error);
                    });
                console.log(response)
                alert(response.data);
                setSelectedPersons(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Can't add client to multiple tables`);
            })
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar alt="Costite" src={image} />
                <Typography component="h1" variant="h5">
                    Adaugare clienti la masa
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '50px',
                            width: '100%',
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <DataGrid
                                rows={mese}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectionChangeMasa}
                                getRowId={(row) => row.id}
                                disableRowSelectionOnClick
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <DataGrid
                                rows={persons}
                                columns={columnsPerson}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectionChangePersons}
                                getRowId={(row) => row.id}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: '50%' }}
                            onClick={onUpdateSelected}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );

}