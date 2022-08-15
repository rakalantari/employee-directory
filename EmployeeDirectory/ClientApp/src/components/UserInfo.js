import React, { Component, useState } from 'react'
import Avatar from "./Avatar"

export default function UserInfo(props) {

    const [user, setUser] = useState(props.user);

    return (
        <div>
            <h1>{user.first_name} {user.last_name}</h1>
            <Avatar user={user} />
            <div>{user.email}</div>
        </div>
    );
}