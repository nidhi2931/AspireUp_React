
import React,{ useState } from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login =()=> {
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
       
        <Container className='mt-5'>
            <Row className='justify-content-md-center'>
                <Col md={4}>
                    <h2 className='text-center mb-4'>Login</h2>
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
                    <p>Don't you have an account?{' '}
                        <Link to="/signup" className="text-primary">Sign Up</Link>
                    </p>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Login;