import React from 'react';
import axios from 'axios';

export const employeeService = axios.create({
    baseURL: 'https://localhost:44432/'
})

export const fetchEmployeeList = async (pageNumber, pageSize) =>{
    const response = await employeeService.get(`/employee?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    return response.data;
}