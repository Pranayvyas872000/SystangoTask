'use client'
import Image from "next/image";
import Mainheader from "../../component/header";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import Link from 'next/link'
import MyPost from "@/component/MyPost";
export default function Home() {
  const userdata = useSelector((state) => state.userdata);
  return (
    <>  
    <Mainheader/>
      <div className="container maincontainer">
<div className="row">
<div className="col-md-2">
<Card >
      <Card.Body>
      <Image
         width={80}
         height={80}
      src={userdata.imageurl}
      alt="Picture of the author"
    />
        <Card.Title>
          {userdata.name}
        </Card.Title>
        <Card.Text>
         {userdata.description}
        </Card.Text> 
      </Card.Body>
    </Card>

<br/>

<Card >
      <ListGroup variant="flush">
        <ListGroup.Item>
        <Link href="/myposts">My Posts</Link></ListGroup.Item>
        <ListGroup.Item>
        <Link href={`/${userdata.id}/edit`}>
          Account Settings</Link></ListGroup.Item>
      </ListGroup>
    </Card>


  </div>
 <MyPost/>
  </div>
</div>
</>  
  );
}
