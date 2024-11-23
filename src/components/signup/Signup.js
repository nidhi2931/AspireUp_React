
import React,{useState} from 'react';
import { Form } from 'react-bootstrap';

const Signup=()=>{
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const handleUsernameInput=(e)=>{

    }

    return(
        <div className="container mt-4">
            <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Enter UserName</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={usernameInput}
                    onChange={handleUsernameInput}
                    />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={emailInput}
                onChange={handleEmailInput}/>
            </Form.Group>
            <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={handlePasswordInput}
                />
            </Form.Group>

            </Form>
        </div>
    )
}