
import React,{useState} from 'react';
import {Offcanvas, Nav,Navbar,Container,Button,Row,Col} from 'react-bootstrap';

import '../sidemenu/Sidemenu.css';


const SideMenu=({children})=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    return(
       <div style={{height:"100vh",overflow:'hidden'}}>
        <Navbar bg='primary' variant='dark' expand='lg' className='mb-3'>
            <Container fluid>
                <Navbar.Brand>
                    Aspire Up
                </Navbar.Brand>
                
                <Button variant='outline-light' onClick={handleShow} className='d-md-none' style={{fontSize:"24px",lineHeight:"1"}}>
                    <span>&#9776;</span>
                </Button>
            </Container>
        </Navbar>

        <Container fluid>
            <Row>
                <Col xs={12} md={3} lg={2} className='d-none d-md-block bg-light vh-100' style={{height:"calc(100vh-56px)",overflow:'auto'}}>
                <div className='p-3'>
                    <Nav className='flex-column'>
                        <Nav.Link href='addsubject'>Add Subject</Nav.Link>
                        <Nav.Link href='addtopics'>Add Topics</Nav.Link>
                        <Nav.Link href='adddocs'>Add Docs</Nav.Link>
                        <Nav.Link href='logout'>Logout</Nav.Link>
                    </Nav>
                    </div></Col>
                    <Col xs={12} md={9} lg={10} className='p-4'>
                    {children}
                    </Col>
            </Row>
        </Container>

        <Offcanvas show={show} onHide={handleClose} placement='start' className='d-md-none'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{overflow:'auto',maxHeight:'100vh'}}>
                <Nav className='flex-column'>
                    <Nav.Link href='addsubject'>Add Subject</Nav.Link>
                    <Nav.Link href=''>Home</Nav.Link>
                    <Nav.Link href=''>Home</Nav.Link>
                    <Nav.Link href=''>Home</Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
       </div>
    )

}

export default SideMenu;