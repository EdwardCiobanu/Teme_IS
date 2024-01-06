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
import {InputAdornment} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";

interface Product {
    id: number;
    fullName: string;
    price: number;
    persons: Persoane[];
}

interface Persoane {
    id: number;
    age: number;
    nume: string;
    products: Product[];
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


export default function AdaugProductClient() {


    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
    const [selectedProducts, setSelectedProducts] = React.useState<Product[] | null>([]);


    const [persons, setPersons] = useState<Persoane[]>([]);
    const [selectedPerson, setSelectedPerson] = React.useState<Persoane | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/Product/FindAll')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/Person/FindAll')
            .then((response) => {
                setPersons(response.data);
            })
            .catch((error) => {
                console.error('Error fetching persons:', error);
            });
    }, []);

    const handleSelectionChangeProduct = (selectionModel: any): void => {
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

    const handleSelectionChangeProducts = (selectionModel: any): void => {
        if (selectionModel.length > 0) {
            const selectedProductIds = selectionModel;
            const selectedProductsList = selectedProductIds.map((selectedProductId: any) => {
                return products.find((p) => p.id === selectedProductId) || null;
            });

            setSelectedProducts(selectedProductsList);
            console.log("Selected products", selectedProductsList);
        } else {
            setSelectedProducts([]);
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
        console.log(selectedProducts)
        console.log(selectedPerson)
        // if(nume.length != 0)
        const person = {
            person: selectedPerson,
            products: selectedProducts,
        }
        if(selectedProducts != null && selectedPerson != null) {
            axios.post("http://localhost:8080/Person/UpdateProductPerson", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedPerson(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setProducts(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
                //console.log(response)
                //alert(response.data);
                setSelectedProducts(null);
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
            const person = {
                id: 0,
                age: 0,
                nume: "",
            }
            axios.post("http://localhost:8080/Person/UpdateProductPerson", person, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any): void => {
                console.log(response)
                alert(response.data);
                setSelectedPerson(null);
                axios.get('http://localhost:8080/Person/FindAll')
                    .then((response) => {
                        setProducts(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching persons:', error);
                    });
                console.log(response)
                alert(response.data);
                setSelectedProducts(null);
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
                    Adaugare produse pentru clienti
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
                                onRowSelectionModelChange={handleSelectionChangePerson}
                                getRowId={(row) => row.id}
                                disableRowSelectionOnClick
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
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
                                onRowSelectionModelChange={handleSelectionChangeProducts}
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