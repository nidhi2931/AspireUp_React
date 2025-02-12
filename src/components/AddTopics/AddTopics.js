import React, { useState,useEffect } from 'react';
import { Container,Row,Col,ListGroup,Modal,Button,Form } from 'react-bootstrap';
import SideMenu from '../sidemenu/Sidemenu';
import axios from 'axios';


const AddTopics=()=>{

    const [topics, setTopics] = new useState([]);
    const [subjects,setSubjects]= useState([]);
    const [selectedSubject,setSelectedSubject] = useState('');


    const [show,setShow] = new useState(false);
    const [newTopic,setNewTopic]  =new useState("");
    const [error,setError] = new useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(()=>{
        const fetchTopics=async()=>{
            try{
                const response = await axios.get('http://127.0.0.1:8000/topics/get/');
                setTopics(response.data);

            }catch(err){
                setError('Failed to fetch topics');
            }
        };

        const fetchSubjects=async()=>{
            try{
                const response=await axios.get('http://127.0.0.1:8000/subjects/get/');
                setSubjects(response.data);
            }
            catch(err){
                setError('Failed to fetch Subjects');
            }
        }

        fetchTopics();
        fetchSubjects();

    },[refreshKey]);

    const handleClose=()=>{

        setShow(false);
        setNewTopic('');
        setSelectedSubject('');
    }

    const handleShow=()=>setShow(true);

    const handleAdd=async(e)=>{
        e.preventDefault();
        if(newTopic.trim() && selectedSubject){
            const newTopicObj = {
                // id: Date.now(), // Temporary ID
                subject:parseInt(selectedSubject),
                name: newTopic.trim(),
                
            };
            // setTopics((prevTopics) => [...prevTopics, newTopicObj]);
            if (newTopic.trim() && selectedSubject) {
                console.log('Sending Data:', {
                    subject:parseInt(selectedSubject),
                    name: newTopic.trim(),
                  
                });
                
            try{
                const response = await axios.post('http://127.0.0.1:8000/topics/create/',newTopicObj);
                console.log(response.data);
                setTopics((prevTopics) => [...prevTopics, response.data]);

    
                setRefreshKey((prevKey) => prevKey + 1);
                
               
                handleClose();

            }
           
            catch(err)
            {
                setError('Failed to Add Subjects');
            }
        }
    }
        else{
            setError('Please enter a topics and select subject');
        }

    };
   

    return(
        <SideMenu>
            <Container className='d-flex justify-content-center' style={{minHeight:"100vh"}}>
                <div style={{width:"50%"}}>
                        <h1 className='d-flex justify-content-center mb-4'>Topics</h1>
                        <Row>
                            <Col xs={4} className='d-flex justify-content-center'>
                                <strong>Serial no.</strong>

                            </Col>
                            <Col xs={8} className='d-flex justify-content-center'>
                                <strong>Topic Name</strong>
                            </Col>
                        </Row>
                <div
                style={{
                    maxHeight:"500px",overflowY:"auto",
                    border:"1px solid #ddd", padding:"10px",
                    borderRadius:"5px",
                }}>
                {
                    topics.length >0 ?(
                        <ListGroup>
                            {topics.map((topic,index)=>(
                                <ListGroup.Item key={`${topic.id}-${index}`}>
                                    <Row>
                                        <Col xs={4} className='d-flex justify-content-center'>{index+1}</Col>
                                        <Col xs={8} className='d-flex justify-content-center'>{topic.name}</Col>
                                
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                    ):(
                        <p>Click "Add topics"</p>

                    )
                }
                </div>

                <div className='d-flex justify-content-center mt-4'>
                    <Button variant="primary" className='mt-3' onClick={handleShow}>Add Topic</Button>
                </div>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header>
                        <Modal.Title>Add Topic</Modal.Title>
                    </Modal.Header>
                   
                    <Modal.Body>
                            {error && <p className='text-danger'>{error}</p>}

                        <Form>
                            <Form.Group>
                                <Form.Label>Topic Name</Form.Label>
                                <Form.Control type='text'
                                placeholder='Enter Topic Name'
                                value={newTopic}
                                onChange={(e)=>setNewTopic(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className='mt-3'>
                                <Form.Label>Select Subject</Form.Label>
                                <Form.Control 
                                as='select'
                                value={selectedSubject}
                                onChange={(e)=>setSelectedSubject(e.target.value)}>
                                    <option value="">Select Subject</option>
                                    {subjects.map((subject)=>(
                                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                                    ))}
                                </Form.Control>

                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        <Button variant='primary' onClick={handleAdd}>Add Topic</Button>
                    </Modal.Footer>
                </Modal>
                </div>
            </Container>
        </SideMenu>
    )
}

export default AddTopics;