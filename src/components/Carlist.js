import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Addcar from "./Addcar";
import Editcar from "./Editcar";


export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(responseData => setCars(responseData._embedded.cars))
    };

    const removeCar = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: "DELETE" })
        .then(response => {
            if (response.ok) {
                fetchData();
            }})}
        };

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchData()
            }})
         };

    const updateCar = (updateCar, link) => {
        fetch(link, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateCar)
          })
        .then((response) => {
            if (response.ok) {
              fetchData();
            }
          });
    };

    const columns = [
        { field: "brand", sortable: true, filter: true },
        { field: "model", sortable: true, filter: true },
        { field: "color", sortable: true, filter: true },
        { field: "fuel", sortable: true, filter: true },
        { field: "year", sortable: true, filter: true },
        { field: "price", sortable: true, filter: true },
        { headerName: "Delete",
            field: "_links.self.href",
            width: 90,
            cellRenderer: (e) => (
                <IconButton color="error" onClick={() => removeCar(e.value)}>
                    <DeleteIcon />
                </IconButton>
            )},
            { headerName: "",
                width: 100,
                field: "_links.self.href",
                cellRenderer: (params) => (
                  <Editcar updateCar={updateCar}  params={params} />
                )
              }
        ];

    return(
        <div>
            <Addcar saveCar={saveCar} />
            <div className="ag-theme-material" style={{height: '700px', width: '70%', margin: 'auto'}} >
                <AgGridReact
                    columnDefs={columns}
                    rowData={cars}
                    paginationPageSize={10}
                    pagination={true}>
                </AgGridReact>
            </div>
        </div>
    );
};