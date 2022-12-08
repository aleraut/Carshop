import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';


export default function Editcar({updateCar, params}) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '', 
        fuel: '', 
        year: '', 
        price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setCar({
            brand: params.data.brand,
            model: params.data.model,
            color: params.data.color,
            fuel: params.data.fuel,
            price: params.data.price,
            year: params.data.year
        });
        console.log(car.brand);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value })
    };

    const handleUpdate = () => {
        updateCar(car, params.value);
        setOpen(false);
    };

    return(
        <div>

            <Button variant="outlined" onClick={handleClickOpen}>
                    Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleInputChange(e)}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handleInputChange(e)}
                        label="Model"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handleInputChange(e)}
                        label="Color"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        onChange={e => handleInputChange(e)}
                        label="Year"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}
                        label="Fuel"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => handleInputChange(e)}
                        label="Price"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};