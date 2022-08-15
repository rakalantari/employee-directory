import React, { Component, useState } from 'react'


export default function Avatar(props) {

    const [user, setUser] = useState(props.user);

    return (
        <img src={user.avatar} alt={user.last_name} />
    );
}