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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";

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

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/Product/FindAll')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSelectionChange = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const   selectedProductId = selectionModel[0];
            const product = products.find((p) => p.id === selectedProductId) || null;
            setSelectedProduct(product);
            console.log("Selected product", product);
        } else {
            setSelectedProduct(null);
            console.log("No row selected");
        }
    };

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
            alert(response.data);
            axios.get('http://localhost:8080/Product/FindAll')
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })

    }

    const onDeleteId = (event: any): void => {
        console.log(id)
        const product = {
            id: id
        }
        axios.post("http://localhost:8080/Product/DeleteById", product, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
            alert(response.data);
            axios.get('http://localhost:8080/Product/FindAll')
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })
    }

    const onDeleteNume= (event: any): void => {
        console.log(nume)
        // if(nume.length != 0)
        axios.post("http://localhost:8080/Product/DeleteByNume", nume, {headers: {"content-type": "application/json"
            }}).then((response: any) : void =>{
            console.log(response)
            alert(response.data);
            axios.get('http://localhost:8080/Product/FindAll')
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }).catch((error) => {
            console.error(error.response.data)
            alert(`Error: ${error.response.data}`);
        })
    }

    const onDeleteSelected= (event: any): void => {
        console.log(selectedProduct)
        // if(nume.length != 0)
        if(selectedProduct != null) {
            axios.post("http://localhost:8080/Product/Delete", selectedProduct, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedProduct(null);
                axios.get('http://localhost:8080/Product/FindAll')
                    .then((response) => {
                        setProducts(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const product = {
                id: 0,
                nume: "",
                price: 0,
            }
            axios.post("http://localhost:8080/Product/Delete", product, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedProduct(null);
                axios.get('http://localhost:8080/Product/FindAll')
                    .then((response) => {
                        setProducts(response.data);
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
        console.log(selectedProduct)
        // if(nume.length != 0)
        const product = {
            id: selectedProduct?.id,
            nume: nume,
            price: price,
        }
        if(selectedProduct != null) {
            axios.post("http://localhost:8080/Product/Update", product, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedProduct(null);
                axios.get('http://localhost:8080/Product/FindAll')
                    .then((response) => {
                        setProducts(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            }).catch((error) => {
                console.error(error.response.data)
                alert(`Error: ${error.response.data}`);
            })
        }
        else{
            const product = {
                id: 0,
                nume: "",
                price: 0,
            }
            axios.post("http://localhost:8080/Product/Update", product, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedProduct(null);
                axios.get('http://localhost:8080/Product/FindAll')
                    .then((response) => {
                        setProducts(response.data);
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
                        <Box sx = {{display:"flex", flexDirection:"row", alignItems:"center", gap:"50px", width:"100%"}}>
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Grid item xs={12}>*/}
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
                            {/*</Grid>*/}
                            {/*<Grid item xs={12}>*/}
                                <TextField
                                    required
                                    fullWidth
                                    id="nume"
                                    label="Numele Produsului"
                                    name="nume"
                                    autoComplete="nume"
                                    onChange = {onChangeNume}
                                />
                            {/*</Grid>*/}
                            {/*<Grid item xs={12}>*/}
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
                        {/*    </Grid>*/}
                        {/*</Grid>*/}

                        </Box>

                        <Box sx={{ mt: 3, height: 400, width: '100%' }}>
                            <DataGrid
                                rows={products}
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
                            Adaugare Produs
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, width: "50%"}}
                            onClick = {onDeleteSelected}
                        >
                            Stergere Produs
                        </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: "50%"}}
                                onClick = {onUpdateSelected}
                            >
                                Update Produs
                            </Button>
                        </Box>
                    </Box>
                </Box>

        </ThemeProvider>
    );
}