import React,{ useState,useContext, useEffect } from 'react';
import {Modal, Button, Form, ListGroup,Row,Col,Container } from 'react-bootstrap';
import SideMenu from '../sidemenu/Sidemenu';
import axios from 'axios';

const AddSubject=()=>{

    const [subjects, setSubjects] = useState([]);
    const [show,setShow] = useState(false);
    const [newSubject,setNewSubject] = useState("");
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchSubjects=async()=>{
            try{
                const response = await axios.get('http://127.0.0.1:8000/subjects/get/');
                setSubjects(response.data);
            } catch(err){
                setError('Failed to fetch subjects');
            }
        };
        fetchSubjects();
    },[]);

    const handleClose=()=>{
        setShow(false);
        setNewSubject("");
    };

    const handleShow=()=>setShow(true);
    const handleAdd=async()=>{
        if(newSubject.trim()){
           try{
            const response = await axios.post('http://127.0.0.1:8000/subjects/add/',{
                name:newSubject.trim()
            });
            setSubjects((prevSubjects)=>[...prevSubjects,response.data]);
            handleClose();

           }
           catch(error){
            setError("Failed to add Subjects");
            
           }
        }
    };
    return(
        <SideMenu>
            <Container className='d-flex justify-content-center' style={{minHeight:"100vh"}}>
                <div style={{width:'50%'}}>

               
            <h1 className="d-flex justify-content-center mb-4">Subjects</h1>
            <Row>
                <Col xs={4} className='d-flex justify-content-center'>
                   <strong>Serial No.</strong> 
                </Col>
                <Col xs={8} className='d-flex justify-content-center'>
                <strong>Subject Name</strong>
                
                </Col>
            </Row>
            { subjects.length > 0 ?(
                <ListGroup>
                    {subjects.map((subject,index)=>(
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col xs={4} className='d-flex justify-content-center'><strong>{index+1}.</strong></Col>
                                <Col xs={8} className='d-flex justify-content-center'>{subject.name}</Col>
                            </Row>
                            
                            </ListGroup.Item>
                    ))}
                </ListGroup>
            ):(
                <p>Click "Add Subject"</p>
            ) }
            <div className='d-flex justify-content-center mt-4'>
                <Button variant='primary' className='mt-3' onClick={handleShow}>Add Subject</Button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Subject
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control type='text'
                            placheholder="Enter Subject Name"
                            value={newSubject}
                            onChange={(e)=>setNewSubject(e.target.value)}/>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleAdd}>Add Subject</Button>
                </Modal.Footer>
            </Modal>
            </div>
            </Container>
        </SideMenu>

        

    )

}

export default AddSubject;
