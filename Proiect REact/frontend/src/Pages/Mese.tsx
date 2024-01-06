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

interface Mese {
    id: number;
    nrLocuri: number;
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


export default function Mese() {


    const [id, setId] = React.useState<number>(0);
    const [nrLocuri, setNrLocuri] = React.useState<number>(0);
    const navigate = useNavigate();



    const onChangeId = (event: any): void => {
        setId(parseInt(event.target.value))
    }
    const onChangeNrLocuri = (event: any): void => {
        setNrLocuri(parseFloat(event.target.value))
    }

    const [mese, setMese] = useState<Mese[]>([]);
    const [selectedMasa, setSelectedMasa] = React.useState<Mese | null>(null);

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
            console.log("Selected table", masa);
        } else {
            setSelectedMasa(null);
            console.log("No row selected");
        }
    };

    const onSave = (event: any): void => {
        console.log(id)
        console.log(nrLocuri)
        const product = {
            id: id,
            nrLocuri: nrLocuri,
        }

        axios.post("http://localhost:8080/Masa/Insert", product, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
            alert(response.data);
            axios.get('http://localhost:8080/Masa/FindAll')
                .then((response) => {
                    setMese(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching tables:', error);
                });
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })

    }

    const onDeleteSelected= (event: any): void => {
        console.log(selectedMasa)
        // if(nume.length != 0)
        if(selectedMasa != null) {
            axios.post("http://localhost:8080/Masa/Delete", selectedMasa, {
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
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const masa = {
                id: 0,
                nrLocuri: 0,
            }
            axios.post("http://localhost:8080/Masa/Delete", masa, {
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
                        console.error('Error fetching products:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
    }

    const onUpdateSelected= (event: any): void => {
        console.log(selectedMasa)
        // if(nume.length != 0)
        const masa = {
            id: selectedMasa?.id,
            nrLocuri: nrLocuri,
        }
        if(selectedMasa != null) {
            axios.post("http://localhost:8080/Masa/Update", masa, {
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
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const masa = {
                id: 0,
                nrLocuri: 0,
            }
            axios.post("http://localhost:8080/Masa/Update", masa, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedMasa(null);
                axios.get('http://localhost:8080/Employee/FindAll')
                    .then((response) => {
                        setMese(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching tables:', error);
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
                <Avatar alt="Masa" src={image}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Gestiune Mese
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Box sx = {{display:"flex", flexDirection:"row", alignItems:"center", gap:"50px", width:"100%"}}>
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Grid item xs={12}>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        <TextField
                            autoComplete="given-name"
                            name="id"
                            required
                            fullWidth
                            id="id"
                            label="Id-ul Mesei"
                            autoFocus
                            onChange = {onChangeId}
                        />

                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        <TextField
                            required
                            fullWidth
                            name="nrLocuri"
                            label="Numarul de locuri"
                            id="nrLocuri"
                            autoComplete="nrLocuri"
                            onChange = {onChangeNrLocuri}
                        />
                        {/*    </Grid>*/}
                        {/*</Grid>*/}

                    </Box>

                    <Box sx={{ mt: 3, height: 400, width: '100%' }}>
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

                    <Box sx = {{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, width: "50%" }}
                            onClick = {onSave}
                        >
                            Adaugare Masa
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, width: "50%"}}
                            onClick = {onDeleteSelected}
                        >
                            Stergere Masa
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "50%"}}
                            onClick = {onUpdateSelected}
                        >
                            Update Masa
                        </Button>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    );
}