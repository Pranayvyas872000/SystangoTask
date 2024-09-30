'use client'
import Image from "next/image";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useInView } from "react-intersection-observer"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Modal from 'react-bootstrap/Modal';
import Post from "@/component/Post";
import Header from "../../component/header";


export default function Home() {
  const router = useRouter()
  const userdata = useSelector((state) => state.userdata);
const [connectionsdata,setconnectionsdata]=useState([])
const [search2, setSearch2] = useState("")

 useEffect(()=>{
  getconnections();
 },[])


 const getconnections=()=> {
  const url="https://jsonserver-rose.vercel.app/"+"users"
  axios.get(url)
  .then((resp) => {
     
    setconnectionsdata(resp.data)
  }).catch((err) => {
      
  });
}
const Searchconnections=()=>{
  const url=  "https://jsonserver-rose.vercel.app/"+"users?q=" + search2
  axios.get(url)
  .then((resp) => {
    setconnectionsdata(resp.data)
  }).catch((err) => {
      
  });
 }

  return (
    <>  
    <Header/>
      <div className="container maincontainer">
<div className="row">
<div className="col-md-2 order-md-1">
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
  <div className="col-md-3 order-md-3">
  
  <div className="row g-3 justify-content-center mt-2">

<div className="col-auto">
  <input type="search" className="form-control searchbar2" id="inputPassword2" placeholder="Search connections" value={search2} onChange={(ev) => setSearch2(ev.target.value)}/>
</div>
<div className="col-auto">
  <button type="submit" className="btn btn-primary mb-3" onClick={Searchconnections}>Go</button>
</div>
</div>
<div className="row">
{
  connectionsdata.map((Item)=>{
   return Item.id==userdata.id?<></>: <div className="col-4" key={Item.id}>

    <div className="user-avatar" onClick={()=>{router.push(`/${Item.username}/profile`)}}>
      <Image
     width={40}
     height={40} src={Item.imageurl}
      alt="Picture of the author"
    />
      <div className={Item.status=="active" ? 'status-overlay-active' : 'status-overlay-unactive'}>
      </div>
     <p> {Item.name}</p>
    </div>
    </div>  
  })
}


</div>


  </div>

 
<Post/>
  </div>
</div>

</>  
  );
}
