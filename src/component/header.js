'use client';

import React, { useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'; 

import { useDispatch, useSelector } from "react-redux";
import {
  setUserdata,
} from "./redux/slices/postsSlice";  
import { useRouter } from 'next/navigation'


export default function Header() {
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const router = useRouter()
useEffect(()=>{
var userdata= localStorage.getItem("userdata")
console.log(userdata)
if(!(userdata==undefined&&userdata==null))
{
  userdata= JSON.parse(userdata)
  console.log(userdata)
  dispatch(setUserdata(userdata));
}
else
{
  router.push('/login')
}
},[])


const logout=()=>{
  localStorage.removeItem("userdata");
  router.push('/login') 
}

  return (
    <>
    <Navbar collapseOnSelect  fixed="top" expand="lg" bg="white" variant="white" className='mainnavbar' >  
        <Container>  
          <Navbar.Brand >{userdata.id}</Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
            </Nav>  
            <Nav>  
              <Nav.Link eventKey={2} onClick={logout}>  
                Logout  
              </Nav.Link>  
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>  
    </>
  )
}
