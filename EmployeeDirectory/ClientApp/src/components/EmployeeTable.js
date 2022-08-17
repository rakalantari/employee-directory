import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ employeeList, pageNumber }) => {

    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>More Info</th>
                </tr>
            </thead>
            <tbody>
                {
                    employeeList.length > 0 ? (
                        employeeList.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td><Link to="/employee-detail" state={{ emp: employee, page: pageNumber }}>More Info</Link></td>
                            </tr>

                        )) : (
                        <tr>
                            <td>No employee found for search criteria</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}


export default EmployeeTable