'use client'
import Image from "next/image";
import Mainheader from "../../../component/header";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useInView } from "react-intersection-observer"
import Link from 'next/link'
import { useRouter ,useParams } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  const params = useParams()
  const [userdata,setuserdata]=useState({})
  const [connectionsdata,setconnectionsdata]=useState([])
  const [postdata,setpostdata]=useState([])
  const [search, setSearch] = useState("")
  useEffect(()=>{
    if(params.id)
      { 
        getuser(params.id);
        getPost(params.id);
      }
   },[])



const getPost=(userid)=>{
    const url=  "https://jsonserver-rose.vercel.app/"+"posts?postuserid="+ userid
    axios.get(url,{
      mode: 'cors'
    })
    .then((resp) => {
      setpostdata(resp.data)
      console.log(resp.data)
    }).catch((err) => {
        console.log(err);
    });
 }


 const getuser=(userid)=>{
  axios.get("https://jsonserver-rose.vercel.app/"+"users/" + userid,{
    mode: 'cors'
  })
        .then((resp) => {
          setuserdata(resp.data)
        }).catch((err) => {
            console.log(err);
        });
 }
 
 
 const SearchPost=()=>{
  const url=  "https://jsonserver-rose.vercel.app/"+"posts?postuserid="+ userdata.id+"&q=" + search
  axios.get(url,{
    mode: 'cors'
  })
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
      <img  className="profileimage" src={userdata.imageurl}/>
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
  <div className="row g-3 justify-content-center mt-2">
  <div className="col-auto">
    <input type="search" className="form-control searchbar1" id="inputPassword1" placeholder="Search any word or phrase"  value={search} onChange={(ev) => setSearch(ev.target.value)}/>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary mb-3" onClick={SearchPost}>Go</button>
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
