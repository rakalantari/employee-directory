/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import * as api from './Api';
import EmailAddressFilter from './EmailAddressFilter';
import EmployeeTable from './EmployeeTable';


export function EmployeeList(props) {
    const [pageNumber, setPageNumber] = useState(1)
    const [keyword, setKeyword] = useState('');
    let employeeList = []
    let pageCount = 0
    const pageSize = 4
    const location = useLocation();

    setPageNumberIfReturned(location, setPageNumber);

    const { isLoading, isError, error, data: empList } = useQuery(['employeeList', pageNumber], () => api.fetchEmployeeList(pageNumber, pageSize), { refetchOnWindowFocus: false, keepPreviousData: true, staleTime: 300000, retry: true, enabled: Boolean(pageNumber) });

    if (isLoading) return <p><em>Loading...</em></p>
    if (isError) return <h2>An error occured while retrieving employee data. Please try again! Error: {error.message}.</h2>

    employeeList = empList.data;
    pageCount = empList.total_pages;

    const pageChange = ({ selected }) => {
        setPageNumber(prev => selected + 1);        
    };

    return (
        <div>
            {renderEmployeeView()}
        </div>
    )

    function renderEmployeeView() {

        employeeList = filterByEmail(employeeList, keyword);

        return (
            <>
                <h1 id="tabelLabel" >Employee List</h1>
                <EmailAddressFilter stateSetter={setKeyword} />
                <EmployeeTable employeeList={employeeList} pageNumber={pageNumber} />
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
                    //forcePage={pageNumber                    
                />
            </>
        );
    }
}

const setPageNumberIfReturned = (location, setPageNumber) => {

    if (location.state !== null && location.state !== undefined && location.state.page > 0) {
        setPageNumber(location.state.page);
        location.state.page = 0;
    }
}

const filterByEmail = (employeeList, keyword) => {

    if (keyword === undefined || keyword === "") return employeeList;

    if (keyword.includes('@'))
        keyword = keyword.substr(0, keyword.indexOf('@'));

    return employeeList.filter(employee => employee.email.toLowerCase().substr(0, employee.email.indexOf('@')).includes(keyword.toLowerCase()));
}


export default EmployeeList