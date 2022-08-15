import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo'


export function EmployeeDetail(props) {
    
    const location = useLocation();
    const employee = location.state?.emp;
    const navigate = useNavigate();

    return (
        <div>
            <UserInfo user={employee} />
            <div>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )
}