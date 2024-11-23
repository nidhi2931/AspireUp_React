
import React,{ useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Link } from 'react-router-dom';

const Login=()=>{
    const[emailInput,setEmailInput]=useState('');
    const[passwordInput,setPasswordInput]=useState('');
    

   const handleEmailInput=(e)=>{
    setEmailInput(e.target.value);
   }

   const handlePasswordInput=(e)=>{
    setPasswordInput(e.target.value);
   }

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert(`INput Value:${emailInput} and ${passwordInput}`);
    }

    return(
        <BrowserRouter>
        <div className='container mt-4'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='emailInput'>
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={emailInput}
                        onChange={handleEmailInput}
                        />
                </Form.Group>
                <Form.Group controlId="passwordInput">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={passwordInput}
                    onChange={handlePasswordInput}
                    />
                </Form.Group>
                <Button type ="submit" variant="primary" className='mt-3'>Submit</Button>
            </Form>
            <p>Don't you have an account?
                <Link to="/signup" className="text-primary">Signup here</Link>
            </p>
        </div>
        </BrowserRouter>
    )
}

export default Login