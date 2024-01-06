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
import image from './manager.png'
import background from './fundal.jpg'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface Employee {
    id: number;
    email: string;
    fullName: string;
    password: string;
    rol: number;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
    },
    {
        field: 'nume',
        headerName: 'Full name',
        width: 150,
        editable: true,
    },
    {
        field: 'password',
        headerName: 'Password',
        width: 150,
        editable: true,
    },
    {
        field: 'rol',
        headerName: 'Rol',
        type: 'number',
        width: 110,
        editable: true,
    },
];


export default function Angajati() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [id, setId] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>("");
    const [nume, setNume] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [rol, setRol] = React.useState<number>(0);
    const navigate = useNavigate();



    const onChangeId = (event: any): void => {
        setId(parseInt(event.target.value))
    }

    const onChangeEmail = (event: any): void => {
        setEmail(event.target.value)
    }

    const onChangeNume = (event: any): void => {
        setNume(event.target.value)
    }

    const onChangePassword = (event: any): void => {
        setPassword(event.target.value)
    }

    const onChangeRol = (event: any): void => {
        setRol(parseFloat(event.target.value))
    }

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        axios.get('http://localhost:8080/Employee/FindAll')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    const handleSelectionChange = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const selectedEmployeeId = selectionModel[0];
            const employee = employees.find((e) => e.id === selectedEmployeeId) || null;
            setSelectedEmployee(employee);
            console.log("Selected product", employee);
        } else {
            setSelectedEmployee(null);
            console.log("No row selected");
        }
    };

    const onSave = (event: any): void => {
        console.log(id)
        console.log(email)
        console.log(nume)
        console.log(password)
        console.log(rol)
        const employee = {
            id: id,
            email: email,
            nume: nume,
            password: password,
            rol: rol,
        }

        axios.post("http://localhost:8080/Employee/Insert", employee, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
            alert(response.data);
            axios.get('http://localhost:8080/Employee/FindAll')
                .then((response) => {
                    setEmployees(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching employees:', error);
                });
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })

    }

    const onDeleteSelected= (event: any): void => {
        console.log(selectedEmployee)
        // if(nume.length != 0)
        if(selectedEmployee != null) {
            axios.post("http://localhost:8080/Employee/Delete", selectedEmployee, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedEmployee(null);
                axios.get('http://localhost:8080/Employee/FindAll')
                    .then((response) => {
                        setEmployees(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching employees:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const employee = {
                id: 0,
                email: "",
                nume: "",
                password: "",
                rol: 0,
            }
            axios.post("http://localhost:8080/Employee/Delete", employee, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedEmployee(null);
                axios.get('http://localhost:8080/Employee/FindAll')
                    .then((response) => {
                        setEmployees(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching employees:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
    }

    const onUpdateSelected= (event: any): void => {
        console.log(selectedEmployee)
        // if(nume.length != 0)
        const product = {
            id: selectedEmployee?.id,
            email: email,
            nume: nume,
            password: password,
            rol: rol,
        }
        if(selectedEmployee != null) {
            axios.post("http://localhost:8080/Employee/Update", product, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedEmployee(null);
                axios.get('http://localhost:8080/Employee/FindAll')
                    .then((response) => {
                        setEmployees(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching employees:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const employee = {
                id: 0,
                email: "",
                nume: "",
                password: "",
                rol: 0,
            }
            axios.post("http://localhost:8080/Employee/Update", product, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedEmployee(null);
                axios.get('http://localhost:8080/Employee/FindAll')
                    .then((response) => {
                        setEmployees(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching employees:', error);
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
                <Avatar alt="Angajat" src={image}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Gestiune Angajati
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Box sx = {{display:"flex", flexDirection:"row", alignItems:"center", gap:"50px", width:"100%"}}>
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Grid item xs={12}>*/}
                        <TextField
                            required
                            fullWidth
                            id="nume"
                            label="Numele Angajatului"
                            name="nume"
                            autoComplete="nume"
                            onChange = {onChangeNume}
                        />
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        <TextField
                            required
                            fullWidth
                            id="nume"
                            label="Email-ul Angajatului"
                            name="nume"
                            autoComplete="nume"
                            onChange = {onChangeEmail}
                        />
                        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                onChange = {onChangePassword}
                                defaultValue={password}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        <TextField
                            required
                            fullWidth
                            name="rol"
                            label="Rolul angajatului"
                            id="rol"
                            autoComplete="rol"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">numar(1-2)</InputAdornment>,
                            }}
                            onChange = {onChangeRol}
                        />
                        {/*    </Grid>*/}
                        {/*</Grid>*/}

                    </Box>

                    <Box sx={{ mt: 3, height: 400, width: '100%' }}>
                        <DataGrid
                            rows={employees}
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
                            Adaugare Angajat
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, width: "50%"}}
                            onClick = {onDeleteSelected}
                        >
                            Stergere Angajat
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "50%"}}
                            onClick = {onUpdateSelected}
                        >
                            Update Angajat
                        </Button>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    );
}