/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';
import { Link, useLocation } from 'react-router-dom';
import { fetchEmployeeList } from './Api';
import EmailAddressFilter from './EmailAddressFilter';

export function EmployeeList(props) {
    let employeeList = []
    let pageNumber = 1
    let pageCount = 0
    const [keyword, setKeyword] = useState('');
    const pageSize = 4
    const location = useLocation();

    if (location.state !== null && location.state !== undefined) {
        pageNumber = location.state.page;
    }

    const { isLoading, isError, error, data: empList, refetch } = useQuery(`page${pageNumber}`, () => fetchEmployeeList(pageNumber, pageSize), { refetchOnWindowFocus: false, keepPreviousData: true, staleTime: 300000 });

    if (isLoading) return <p><em>Loading...</em></p>
    if (isError) return <h2>An error occured while retrieving employee data. Please try again! Error: {error.message}.</h2>

    employeeList = empList.data;
    pageNumber = empList.page;
    pageCount = empList.total_pages;

    const pageChange = ({ selected }) => {
        pageNumber = selected + 1;
        refetch();

    };

    return (
        <div>
            <h1 id="tabelLabel" >Employee List</h1>
            {renderEmployeeView()}
        </div>
    )

    function renderEmployeeView() {

        employeeList = filterByEmail(employeeList, keyword);

        return (
            <>
                <EmailAddressFilter stateSetter={setKeyword} />
                {populateEmployeeTable(employeeList, pageNumber)}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={pageChange}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                /* forcePage={pageNumber}*/
                />
            </>
        );
    }
}

const filterByEmail = (employeeList, keyword) => {

    if (keyword === undefined || keyword === "") return employeeList;

    if (keyword.includes('@'))
        keyword = keyword.substr(0, keyword.indexOf('@'));

    return employeeList.filter(employee => employee.email.toLowerCase().substr(0, employee.email.indexOf('@')).includes(keyword.toLowerCase()));
}

const populateEmployeeTable = (employeeList, pageNumber) => {

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


export default EmployeeList