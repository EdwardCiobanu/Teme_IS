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
import image from './costite.jpg'
import background from './fundal.jpg'
import {InputAdornment} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Produs() {

    const [id, setId] = React.useState<number>(0);
    const [nume, setNume] = React.useState<string>("");
    const [price, setPrice] = React.useState<number>(0);
    const navigate = useNavigate();

    const onChangeId = (event: any): void => {
        setId(parseInt(event.target.value))
    }

    const onChangeNume = (event: any): void => {
        setNume(event.target.value)
    }


    const onChangePrice = (event: any): void => {
        setPrice(parseFloat(event.target.value))
    }

    const onSave = (event: any): void => {
        console.log(id)
        console.log(nume)
        console.log(price)
        const product = {
            id: id,
            nume: nume,
            price: price,
        }
        axios.post("http://localhost:8080/Product/Insert", product, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
        })

    }

    const onDeleteId = (event: any): void => {
        console.log(id)
        axios.post("http://localhost:8080/Product/DeleteById", id, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
        })
    }

    const onDeleteNume= (event: any): void => {
        console.log(nume)
        axios.post("http://localhost:8080/Product/DeleteByNume", nume, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const product = {
            id: data.get('id'),
            nume: data.get('nume'),
            price: data.get('price'),
            // persons: data.get('persons'),
        }
        console.log({
            id: product.id,
            nume: product.nume,
            price: product.price,
        });
        axios.post("https://localhost:8080/Product/Insert", product, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
        })
    };

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
                    <Avatar alt="Costite" src={image}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Gestiune Produse
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="id"
                                    required
                                    fullWidth
                                    id="id"
                                    label="Id-ul Produsului"
                                    autoFocus
                                    onChange = {onChangeId}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nume"
                                    label="Numele Produsului"
                                    name="nume"
                                    autoComplete="nume"
                                    onChange = {onChangeNume}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="price"
                                    label="Pretul produsului"
                                    id="price"
                                    autoComplete="price"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">lei</InputAdornment>,
                                    }}
                                    onChange = {onChangePrice}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick = {onSave}
                        >
                            Adaugare Produs
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick = {onDeleteNume}
                        >
                            Stergere Produs
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}