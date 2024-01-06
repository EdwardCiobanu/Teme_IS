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
import image from './profile.png'
import background from './fundal.jpg'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import {useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Admin() {

    const navigate = useNavigate();
    const location = useLocation();
    const { key } = location.state;

    const { id, nume, rol, email, password } = key;


    const [showPassword, setShowPassword] = React.useState(false);
    const [id1, setId] = React.useState<number>(id);
    const [nume1, setNume] = React.useState<string>(nume);
    const [rol1, setRol] = React.useState<number>(rol);
    const [email1, setEmail] = React.useState<string>(email);
    const [password1, setPassword] = React.useState<string>(password);


    const [isDisabled, setIsDisabled] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const onEditInfos = () => {
        setIsDisabled(!isDisabled);
    };

    const onNavigateProdus = (event: any): void => {
        navigate("/Produs");
    }
    const onNavigateAngajati = (event: any): void => {
        navigate("/Angajati");
    }

    const onNavigateMese = (event: any): void => {
        navigate("/Mese");
    }

    const onNavigatePersoane = (event: any): void => {
        navigate("/Persoane");
    }

    const onChangeId = (event: any): void => {
        setId(parseInt(event.target.value))
    }
    const onChangeRol = (event: any): void => {
        setRol(parseInt(event.target.value))
    }
    const onChangeNume = (event: any): void => {
        setNume(event.target.value)
    }
    const onChangeEmail = (event: any): void => {
        setEmail(event.target.value)
    }
    const onChangePassword = (event: any): void => {
        setPassword(event.target.value)
    }

    const onUpdateInfos = (event: any): void => {
        console.log(id1)
        console.log(nume1)
        console.log(rol1)
        console.log(email1)
        console.log(password1)
        const employee = {
            id: id1,
            nume: nume1,
            rol: rol1,
            email: email1,
            password: password1,
        }

        axios.post("http://localhost:8080/Employee/Update", employee, {headers: {"Content-Type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
            alert(`Update succesfully`);
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt="Avatar" src={image}>

                    </Avatar>
                    <Typography component="h1" variant="h5" sx = {{mt:3}}>
                        Pagina Admin
                    </Typography>
                    <TextField
                        fullWidth
                        name="id"
                        disabled={isDisabled}
                        id="outlined-disabled"
                        label="Id"
                        defaultValue={id}
                        sx={{ mt: 3, mb: 2 }}
                        onChange = {onChangeId}
                    />
                    <TextField
                        fullWidth
                        name="id"
                        disabled={isDisabled}
                        id="outlined-disabled"
                        label="Nume"
                        defaultValue={nume}
                        sx={{ mt: 3, mb: 2 }}
                        onChange = {onChangeNume}
                    />
                    <TextField
                        fullWidth
                        name="id"
                        disabled={isDisabled}
                        id="outlined-disabled"
                        label="Rol"
                        defaultValue={rol}
                        sx={{ mt: 3, mb: 2 }}
                        onChange = {onChangeRol}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">numar(1-2)</InputAdornment>,
                        }}
                    />
                    <TextField
                        fullWidth
                        name="id"
                        disabled={isDisabled}
                        id="outlined-disabled"
                        label="Email"
                        defaultValue={email}
                        sx={{ mt: 3, mb: 2 }}
                        onChange = {onChangeEmail}
                    />

                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            disabled={isDisabled}
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
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick = {onEditInfos}
                        >
                            Editare informatii proprii
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick = {onNavigateProdus}
                        >
                            Editare Produse
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick = {onNavigateAngajati}
                        >
                            Editare Angajati
                        </Button>
                        <Button
                            type = "button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick = {onNavigateMese}
                        >
                            Editare Mese
                        </Button>
                        <Button
                            type = "button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick = {onNavigatePersoane}
                        >
                            Editare Persoane
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick = {onUpdateInfos}
                        >
                            Modifica informatiile proprii
                        </Button>


                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}