import React from 'react';

const EmailAddressFilter = ({ stateSetter }) => {

    return (
        <div>
            Filter by email:&nbsp;&nbsp;
            <input id="filter" name="filter" type="text" onChange={event => stateSetter(event.target.value)} />
        </div>
    )
}

export default EmailAddressFilter