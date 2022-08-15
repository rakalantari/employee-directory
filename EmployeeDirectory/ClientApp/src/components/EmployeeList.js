/* eslint-disable-next-line */
import React, { useEffect, useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
//import { memoize } from "lodash";
import EmailAddressFilter from './EmailAddressFilter';

var cache = {};

const fetchEmployeeList = async (pageNumber, pageSize) => {

    if (cache[pageNumber] !== undefined)
        return cache[pageNumber];

    const response = await fetch(`https://localhost:44432/employee?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const responseJson = await response.json();
    cache[pageNumber] = responseJson;
    return responseJson;
}

export function EmployeeList(props) {
    const [loading, setLoading] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 4
    const [pageCount, setPageCount] = useState(0);

    // Comment: Tried to prevent api call for already visited pages using useMemo hook but it did not work as I expected.
    // Why? This is why Object is used for implementing a local cache to avoid redundent api calls.

    //const response = useMemo(() => {
    //    return fetchEmployeeList(pageNumber, pageSize)
    //}, [pageNumber]);

    useEffect(() => {
        let isSubscribed = true
        populateEmployeeList()
        return () => { isSubscribed = false }

        async function populateEmployeeList() {

            const response = await fetchEmployeeList(pageNumber, pageSize);

            if (isSubscribed) {
                setEmployeeList(response.data);
                setPageCount(response.total_pages);
                setLoading(false);
            }
        }

    }, [pageNumber])



    const pageChange = ({ selected }) => {
        setPageNumber(selected + 1);
    };

    let contents = loading ? <p><em>Loading...</em></p> : renderEmployeeView(employeeList);

    return (
        <div>
            <h1 id="tabelLabel" >Employee List</h1>
            {contents}
        </div>
    )

    function renderEmployeeView(employeeList) {
        return (
            <>
                <EmailAddressFilter stateSetter={setKeyword} />
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
                        {filterByEmail(employeeList, keyword).map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td><Link to="/employee-detail" state={{ emp: employee }}>More Info</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

export default EmployeeList