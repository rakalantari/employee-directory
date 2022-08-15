import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailAddressFilter = ({ stateSetter }) => {

    return (
        <div>
            Filter by email:&nbsp;&nbsp;
            <input id="filter" name="filter" type="text" onChange={event => stateSetter(event.target.value)} />
        </div>
    )
}

export default EmailAddressFilter