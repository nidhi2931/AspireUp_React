
import React,{ useState } from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login =()=> {
    const[emailInput,setEmailInput]=useState('');
    const[passwordInput,setPasswordInput]=useState('');
    const[error,setError] = useState('');
    const navigate=useNavigate();
    

   const handleEmailInput=(e)=>{
    setEmailInput(e.target.value);
   }

   const handlePasswordInput=(e)=>{
    setPasswordInput(e.target.value);
   }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setError('');
        try{
            const response= await axios.post('http://127.0.0.1:8000/api/login/',{
                email:emailInput,
                password:passwordInput,

                
            });
            if (response.status===200){
                navigate('/sidemenu');

            }
            else{
                setError('Invalid username or password');
            }

        }
        catch(err){
            setError(err.response?.data?.message||'Something went wrong.Please try again.');

        }
        
    };

    return(
       
        <Container className='mt-5'>
            <Row className='justify-content-md-center'>
                <Col md={4}>
                    <h2 className='text-center mb-4'>Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='emailInput'>
                            <Form.Label>Email</Form.Label>
                                <Form.Control
                                type="text"
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