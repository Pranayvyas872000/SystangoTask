'use client'
import Image from "next/image";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useInView } from "react-intersection-observer"
import Link from 'next/link'
import { useRouter ,useParams } from 'next/navigation'
import Modal from 'react-bootstrap/Modal';

export default function ProfilePost() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [userdata,setuserdata]=useState({})
  const [postdata,setpostdata]=useState([])
  const [search, setSearch] = useState("")
  
  const [postcomments, setpostcomments] = useState("")


  const [posttitle, setposttitle] = useState("")
  const [postdescription, setPostdescription] = useState("")
  const [editpostdata, seteditpostdata] = useState({})
  
  
  const [nomoredata, setnomoredata] = useState(false)
  const [currentPage,setCurrentPage]= useState(0)

  const params = useParams()



  useEffect(()=>{
    if(params.id)
      { 
        getuser(params.id);
        getPost(params.id);
      }
   },[])


   const getuser=(userid)=>{
    const url ="https://jsonserver-rose.vercel.app/"+"users/" + userid
    axios.get(url)
          .then((resp) => {
            setuserdata(resp.data)
          }).catch((err) => {
              
          });
   }

  const editPost=()=>{
    setCurrentPage(0)
    setpostdata([])
    const localuserData={
      "id": editpostdata.id,
      "postuserid": editpostdata.postuserid,
      "heading": posttitle,
      "description": postdescription,
      "comments": editpostdata.comments
    }
  const  url ="https://jsonserver-rose.vercel.app/"+`posts/${editpostdata.id}`
    axios.patch(url,localuserData)
    .then((resp) => {
      getPost("loadmore");
    }).catch((err) => {
        
    });
  }


  const addComment=()=>{
    setCurrentPage(0)
    setpostdata([])
    const localuserData={
      "id": editpostdata.id,
      "postuserid": editpostdata.postuserid,
      "heading": editpostdata.heading,
      "description": editpostdata.description,
      "comments": [...editpostdata.comments,{
        "comment":postcomments,
        "userid": userdata.id
      }]
    }
  const  url ="https://jsonserver-rose.vercel.app/"+`posts/${editpostdata.id}`
    axios.patch(url,localuserData)
    .then((resp) => {
      getPost("loadmore");
    }).catch((err) => {
    });
  }




 
const getPost=(userid)=>{
  const url=  "https://jsonserver-rose.vercel.app/"+"posts?postuserid="+ userid
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
        
    });
   }

  const SearchPost=()=>{
    const url=  "https://jsonserver-rose.vercel.app/"+"posts?postuserid="+ userdata.id+"&q=" + search
    axios.get(url)
    .then((resp) => {
      setCurrentPage(1)
      setpostdata(resp.data)
    }).catch((err) => {
        
    });
   }

  return (
    <>
    <div className="col-md-7 order-md-2">
  <div className="row g-3 justify-content-center mt-2">
  <div className="col-auto">
    <input type="search" className="form-control searchbar1" id="inputPassword1" placeholder="Search any word or phrase"  value={search} onChange={(ev) => setSearch(ev.target.value)}/>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary mb-3" onClick={SearchPost}>Go</button>
  </div>
</div>


{postdata.length>0? postdata.map((Item)=>{
  return <Card  className="postcard" key={Item.id}>
     <Card.Body>
       <Card.Title>{Item.heading}</Card.Title>
       <Card.Text>
       {Item.description}
       </Card.Text>
       <button  className="btn btn-primary mb-3" onClick={()=>{
           seteditpostdata(Item)
        handleShow2()
       }}>Add comments</button>
     </Card.Body>
   </Card>
 }) :<>No Post found</> }


  </div>


  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
           <Modal.Body>

           <div className={'inputContainer'}>
      <input
        value={posttitle}
        placeholder="Enter your User Name here"
        onChange={(ev) => setposttitle(ev.target.value)}
        className={'inputBox'}
      />
    
    </div>
    <br />  
           <div className={'inputContainer'}>
      <textarea
        value={postdescription}
        placeholder="Enter your description here"
        onChange={(ev) => setPostdescription(ev.target.value)}
        className={'inputBox'}
      />
    </div>
           </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            editPost()
            handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add comments</Modal.Title>
        </Modal.Header>
           <Modal.Body>
           <div className={'inputContainer'}>
      <textarea
        value={postcomments}
        placeholder="Enter your comment here"
        onChange={(ev) => setpostcomments(ev.target.value)}
        className={'inputBox'}
      />
    </div>
           </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            addComment()
            handleClose2()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


  </>
  )
}
