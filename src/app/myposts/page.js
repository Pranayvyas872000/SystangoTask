'use client'
import Image from "next/image";
import Mainheader from "../../component/Header";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import Link from 'next/link'
export default function Home() {
  const userdata = useSelector((state) => state.userdata);

const [postdata,setpostdata]=useState([])
const [search, setSearch] = useState("")
  var pageSize = 6
 useEffect(()=>{
  if(userdata.id)
    {
  getPost();
    }
 },[userdata])



 const getPost=()=>{
  if(userdata)
  {
    const url=  "http://localhost:8000/posts?postuserid="+ userdata.id
    axios.get(url)
    .then((resp) => {
      setpostdata(resp.data)
      console.log(resp.data)
    }).catch((err) => {
        console.log(err);
    });
  }
 }

 




 
 const SearchPost=()=>{
  const url=  "http://localhost:8000/posts?postuserid="+ userdata.id+"&q=" + search
  axios.get(url)
  .then((resp) => {
    setpostdata(resp.data)
  }).catch((err) => {
      console.log(err);
  });
 }





  return (
    <>  
    <Mainheader/>
      <div className="container maincontainer">
<div className="row">
<div className="col-md-2">
<Card >
      <Card.Body>
      <img  class="profileimage" src={userdata.imageurl}/>
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
        <Link href="/accountSettings">
          Account Settings</Link></ListGroup.Item>
      </ListGroup>
    </Card>


  </div>
  <div className="col-md-7">
  <div class="row g-3 justify-content-center">
  <div class="col-auto">
    <input type="search" className="form-control searchbar1" id="inputPassword1" placeholder="Search any word or phrase"  value={search} onChange={(ev) => setSearch(ev.target.value)}/>
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary mb-3" onClick={SearchPost}>Go</button>
  </div>
</div>

{
  postdata.map((Item)=>{
   return <Card  className="postcard" key={Item.id}>
      <Card.Body>
        <Card.Title>{Item.heading}</Card.Title>
        <Card.Text>
        {Item.description}
        </Card.Text>
      </Card.Body>
    </Card>
  })
}
  </div>
  </div>
</div>
</>  
  );
}
