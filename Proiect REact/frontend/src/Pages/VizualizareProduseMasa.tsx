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
import image from './drink.png'
import background from './fundal.jpg'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface Mese {
    id: number;
    nrLocuri: number;
}

interface Product {
    id: number;
    fullName: string;
    price: number;
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


export default function VizualizareProduseMasa() {


    const [id, setId] = React.useState<number>(0);

    const navigate = useNavigate();



    const onChangeId = (event: any): void => {
        setId(parseInt(event.target.value))
    }

    const [mese, setMese] = useState<Mese[]>([]);
    const [selectedMasa, setSelectedMasa] = React.useState<Mese | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/Masa/FindAll')
            .then((response) => {
                setMese(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tables:', error);
            });
    }, []);

    const handleSelectionChange = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const selectedMasaId = selectionModel[0];
            const masa = mese.find((m) => m.id === selectedMasaId) || null;
            setSelectedMasa(masa);
            console.log("Selected masa", masa);
        } else {
            setSelectedMasa(null);
            console.log("No row selected");
        }
    };


    const onUpdateSelected= (event: any): void => {
        console.log(selectedMasa)
        // if(nume.length != 0)
        const masa = {
            id: selectedMasa?.id,
            nrLocuri: selectedMasa?.nrLocuri,
        }
        if(selectedMasa != null) {
            axios.post("http://localhost:8080/Masa/FindById", masa, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                setSelectedMasa(null);
                setProducts(response.data);
                alert("Produsele vor fi afisate in tabela corespunzatoare");
                axios.get('http://localhost:8080/Masa/FindAll')
                    .then((response) => {
                        setMese(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching tables:', error);
                    });
            }).catch((error) => {
                setProducts([]);
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const masa = {
                id: 0,
                nrLocuri: 0,
            }
            axios.post("http://localhost:8080/Masa/FindById", masa, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert("Error");
                setSelectedMasa(null);
                setProducts([]);
                axios.get('http://localhost:8080/Masa/FindAll')
                    .then((response) => {
                        setMese(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching tables:', error);
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
                    Vizualizare Produse Pentru Masa
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