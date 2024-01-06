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

interface Product {
    id: number;
    fullName: string;
    price: number;
    persons: Persoane[];
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

const columnsProduct: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'nume',
        headerName: 'Full name',
        width: 150,
        editable: true,
    },

    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true,
    },
];


export default function VizualizareProdusePersoana() {


    const [nume, setNume] = React.useState<string>("");
    const navigate = useNavigate();



    const onChangeNume = (event: any): void => {
        setNume(event.target.value)
    }

    const [persons, setPersons] = useState<Persoane[]>([]);
    const [selectedPerson, setSelectedPerson] = React.useState<Persoane | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

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


    const onUpdateSelected= (event: any): void => {
        console.log(selectedPerson)
        // if(nume.length != 0)
        const person = {
            id: selectedPerson?.id,
            age: selectedPerson?.age,
            nume: selectedPerson?.nume,
        }
        if(selectedPerson != null) {
            axios.post("http://localhost:8080/Person/FindByNume", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                setSelectedPerson(null);
                setProducts(response.data);
                alert("Produsele vor fi afisate in tabela corespunzatoare");
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                setProducts([]);
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
            axios.post("http://localhost:8080/Person/FindByNume", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert("Error");
                setSelectedPerson(null);
                setProducts([]);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setPersons(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
            }).catch((error) => {
                setProducts([]);
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
                <Avatar alt="Masa" src={image}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Vizualizare Produse Pentru Persoana
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Box sx = {{display:"flex", flexDirection:"row", alignItems:"center", gap:"50px", width:"100%"}}>
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Grid item xs={12}>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}

                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}

                        {/*    </Grid>*/}
                        {/*</Grid>*/}

                    </Box>

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
                        <Box sx={{ flex: 1 }}>
                            <DataGrid
                                rows={products}
                                columns={columnsProduct}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                //checkboxSelection
                                //onRowSelectionModelChange={handleSelectionChange}
                                getRowId={(row) => row.id}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Box>

                    <Box sx = {{display:"flex", flexDirection:"column", alignItems:"center"}}>

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "50%"}}
                            onClick = {onUpdateSelected}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    );
}