import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Box, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {parentDivStyle, saveButtonStyle, deleteButtonStyle} from "./Product.styles";


export const Product = (): JSX.Element => {
    const [id, setId] = React.useState<string>("");
    const [nume, setNume] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
    const navigate = useNavigate();

    const onChangeId = (event: any): void => {
        setId(event.target.value)
    }

    const onChangeNume = (event: any): void => {
        setNume(event.target.value)
    }


    const onChangePrice = (event: any): void => {
        setPrice(event.target.value)
    }

    const save = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const product = {
            id: data.get('id'),
            nume: data.get('nume'),
            price: data.get('price'),
            // persons: data.get('persons'),
        }
        console.log({price: data.get('price')
        });
        axios.post("https://localhost:8080/Product/Insert", product, {headers: {"content-type": "application/json"
        }}).then((response: any) : void =>{
            console.log(response)
        })
    }

    const delet = (event: any): void => {

    }

    return <div style={parentDivStyle}>
        <Box component="form" onSubmit={save} noValidate sx={{ mt: 1 }}>
        <div style={{ marginTop: 20 }}>
            {/*<TextField id="id" name = "id" label="Standard" variant="standard" onChange={onChangeId} />*/}
            <TextField
                required
                fullWidth
                id="id"
                label="Id"
                name="id"
                autoComplete="id"
            />
        </div>
        <div style={{ marginTop: 20 }}>
            <TextField id="nume" name = "nume" label="Standard" variant="standard" onChange={onChangeNume} />
        </div>
        <div style = {{ marginTop: 20 }}>
            <TextField id="price" name = "price" label="Standard" variant="standard" onChange={onChangePrice} />
        </div>
            <div style={{ marginTop: 20 }}>
                {/*<TextField id="id" name = "id" label="Standard" variant="standard" onChange={onChangeId} />*/}
                <TextField
                    required
                    fullWidth
                    id="persons"
                    label="Persons"
                    name="persons"
                    autoComplete="persons"
                />
            </div>

        <Button type = "submit" style ={saveButtonStyle}  variant="outlined">SaveButton</Button>
        </Box>

        <Button style ={deleteButtonStyle} variant="outlined">DeleteButton</Button>
    </div>
}