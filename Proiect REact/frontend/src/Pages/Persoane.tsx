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
import image from './client.png'
import background from './fundal.jpg'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

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


export default function Persoane() {


    const [id, setId] = React.useState<number>(0);
    const [age, setAge] = React.useState<number>(0);
    const [nume, setNume] = React.useState<string>("");
    const navigate = useNavigate();



    const onChangeId = (event: any): void => {
        setId(parseInt(event.target.value))
    }
    const onChangeAge = (event: any): void => {
        setAge(parseFloat(event.target.value))
    }

    const onChangeNume = (event: any): void => {
        setNume(event.target.value)
    }

    const [persons, setPersons] = useState<Persoane[]>([]);
    const [selectedPerson, setSelectedPerson] = React.useState<Persoane | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/Person/FindAll')
            .then((response) => {
                setPersons(response.data);
            })
            .catch((error) => {
                console.error('Error fetching persons:', error);
            });
    }, []);

    const handleSelectionChange = (selectionModel: any): void => {
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

    const onSave = (event: any): void => {
        console.log(id)
        console.log(age)
        console.log(nume)
        const person = {
            id: id,
            age: age,
            nume: nume,
        }

        axios.post("http://localhost:8080/Person/Insert", person, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
            alert(response.data);
            axios.get('http://localhost:8080/Person/FindAll')
                .then((response) => {
                    setPersons(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching persons:', error);
                });
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })

    }

    const onDeleteSelected= (event: any): void => {
        console.log(selectedPerson)
        // if(nume.length != 0)
        if(selectedPerson != null) {
            axios.post("http://localhost:8080/Person/Delete", selectedPerson, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedPerson(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const person = {
                id: 0,
                age: 0,
                nume: "",
            }
            axios.post("http://localhost:8080/Person/Delete", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedPerson(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
    }

    const onUpdateSelected= (event: any): void => {
        console.log(selectedPerson)
        // if(nume.length != 0)
        const person = {
            id: selectedPerson?.id,
            age: age,
            nume: nume,
        }
        if(selectedPerson != null) {
            axios.post("http://localhost:8080/Person/Update", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedPerson(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const person = {
                id: 0,
                age: 0,
                nume: "",
            }
            axios.post("http://localhost:8080/Person/Update", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedPerson(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
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
                <Avatar alt="Person" src={image}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Gestiune Persoane
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Box sx = {{display:"flex", flexDirection:"row", alignItems:"center", gap:"50px", width:"100%"}}>
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Grid item xs={12}>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}

                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        <TextField
                            required
                            fullWidth
                            name="age"
                            label="Varsta Persoanei"
                            id="age"
                            autoComplete="age"
                            onChange = {onChangeAge}
                        />

                        <TextField
                            required
                            fullWidth
                            id="nume"
                            label="Numele Persoanei"
                            name="nume"
                            autoComplete="nume"
                            onChange = {onChangeNume}
                        />

                        {/*    </Grid>*/}
                        {/*</Grid>*/}

                    </Box>

                    <Box sx={{ mt: 3, height: 400, width: '100%' }}>
                        <DataGrid
                            rows={persons}
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
                            onRowSelectionModelChange={handleSelectionChange}
                            getRowId={(row) => row.id}
                            disableRowSelectionOnClick
                        />
                    </Box>

                    <Box sx = {{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, width: "50%" }}
                            onClick = {onSave}
                        >
                            Adaugare Persoana
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, width: "50%"}}
                            onClick = {onDeleteSelected}
                        >
                            Stergere Persoana
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "50%"}}
                            onClick = {onUpdateSelected}
                        >
                            Update Persoana
                        </Button>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    );
}