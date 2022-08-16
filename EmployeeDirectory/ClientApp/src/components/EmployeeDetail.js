import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo'


export function EmployeeDetail(props) {
    
    const location = useLocation();
    const employee = location.state?.emp;
    const pageNumber = location.state?.page;
    const navigate = useNavigate();

    return (
        <div>
            <UserInfo user={employee} />
            <div>
                <Link className="btn btn-primary" to="/employee-list" state={{ page: pageNumber }}>Back</Link>
            </div>
        </div>
    )
}