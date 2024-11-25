
import React,{useState} from 'react';
import { Form,Button,Container,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup=()=>{
        const [formData,setFormData ]=useState({
            username:'',
            email:"",
            password:'',
        });

        const [message,setMessage] = useState(null);
        const [error,setError]=useState(null);

        const handleChange =(e)=>{
            const {name,value} = e.target;
            setFormData({...formData,[name]:value});
        };



  

        const handleSignupSubmit =async(e)=>{
            e.preventDefault();
            setMessage(null);
            setError(null);
            try{
                const response=await axios.post('http://127.0.0.1:8000/api/signup/',formData);
                setMessage(`Signup Successful!${response.data.username}`);

            }
            catch(err){
                setError(err.response?.data?.error||"Signup Failed. Try Again.");

            }

        };

    return(
        <Container className="mt-5" style={{maxWidth:'500px'}}>
            <h2 className='text-center'>Signup</h2>
            {message && <Alert variant='success'>{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>UserName</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}/>
                </Form.Group>
                <Button type ="submit" variant="primary" className='mt-3'>Submit</Button>
            </Form>
            <p>Already have an account?{' '}
                        <Link to="/login" className="text-primary">Login</Link>
                    </p>
        </Container>
    )
}

export default Signup;