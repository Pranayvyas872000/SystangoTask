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
import { useInView } from "react-intersection-observer"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const userdata = useSelector((state) => state.userdata);
const [connectionsdata,setconnectionsdata]=useState([])
const [postdata,setpostdata]=useState([])
const [search, setSearch] = useState("")
const [search2, setSearch2] = useState("")
const [nomoredata, setnomoredata] = useState(false)
const [currentPage,setCurrentPage]= useState(0)
const [totalPages, setTotalPages] = useState(1)
const [sortColumn, setSortColumn] = useState({ column: "id", orderBy: "desc" })
const { ref, inView } = useInView()
  var pageSize = 6
 useEffect(()=>{
  getconnections();
 },[])
 useEffect(() => {
  if (inView) {
    getPost("loadmore");
  }
}, [inView])



 const getPost=()=>{
  var localcurrentPage=currentPage+1
  const url=  "http://localhost:8000/posts?_page=" + localcurrentPage + "&_limit=" + pageSize
  + "&q=" + search + "&_sort="  + sortColumn.orderBy
  axios.get(url)
  .then((resp) => {
  if(resp.data.length>0)
  {
    setCurrentPage(currentPage+1)
    setpostdata(postdata => [...postdata, ...resp.data])
    setnomoredata(false)
  }
  else
  {
    setnomoredata(true)
  }
  }).catch((err) => {
      console.log(err);
  });
 }

 




 
 const SearchPost=()=>{
  const url=  "http://localhost:8000/posts?q=" + search
  axios.get(url)
  .then((resp) => {
    setCurrentPage(1)
    setpostdata(resp.data)
  }).catch((err) => {
      console.log(err);
  });
 }



 const getconnections=()=> {
  axios.get("http://localhost:8000/users")
  .then((resp) => {
    console.log(resp) 
    setconnectionsdata(resp.data)
  }).catch((err) => {
      console.log(err);
  });
}
const Searchconnections=()=>{
  const url=  "http://localhost:8000/users?q=" + search2
  axios.get(url)
  .then((resp) => {
    setconnectionsdata(resp.data)
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


{postdata.length>0? postdata.map((Item)=>{
  return <Card  className="postcard" key={Item.id}>
     <Card.Body>
       <Card.Title>{Item.heading}</Card.Title>
       <Card.Text>
       {Item.description}
       </Card.Text>
     </Card.Body>
   </Card>
 }) :<>No Post found</> }

{nomoredata?
<></>:<div  className="d-flex justify-content-center" ref={ref}>
<img src="/Spinner.gif" className="spinnerclass"/>  
</div> }
  

  </div>
  <div className="col-md-3">
  
  <div class="row g-3 justify-content-center">

<div class="col-auto">
  <input type="search" className="form-control searchbar2" id="inputPassword2" placeholder="Search connections" value={search2} onChange={(ev) => setSearch2(ev.target.value)}/>
</div>
<div class="col-auto">
  <button type="submit" class="btn btn-primary mb-3" onClick={Searchconnections}>Go</button>
</div>
</div>
<h4>My Connections</h4>


<div className="row">
{
  connectionsdata.map((Item)=>{
   return Item.id==userdata.id?<></>: <div className="col-md-4" key={Item.id}>
    <div class="user-avatar" onClick={()=>{router.push(`/${Item.username}/profile`)}}>
      <img class="avatar" src={Item.imageurl}/>
      <div class={Item.status=="active" ? 'status-overlay-active' : 'status-overlay-unactive'}>
      </div>
     <p> {Item.name}</p>
    </div>
    </div>  
  })
}


</div>


  </div>
  </div>
</div>
</>  
  );
}
