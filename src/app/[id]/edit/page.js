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
import { useRouter } from 'next/navigation'
import {
  setUserdata,
} from "../../../component/redux/slices/postsSlice"; 
export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdata);
const [postdata,setpostdata]=useState([])
const [search, setSearch] = useState("")
const [fullName, setfullName] = useState('')
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [description, setDescription] = useState('')
  const [fileBase64,setFileBase64]= useState('')
  const [password, setPassword] = useState('')

 const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

useEffect(()=>{
  setfullName(userdata.name)
  setuserName(userdata.username)
  setEmail(userdata.email)
  setPhoneNo(userdata.phone)
  setDescription(userdata.description)
  setFileBase64(userdata.imageurl)
  setPassword(userdata.password)
},[userdata])

    const  handleUpload = (e) => {
    const file = e.target.files[0];
    if (file != null) {
      if (file.type.match("audio.*")) {
        toast.error("File extension not allowed!");
      } else if (file.type.match("video.*")) {
        toast.error("File extension not allowed!");
      } else if (file.size > 20971520 ) {
        toast.error("File too big!");
      }  else {
           getBase64(file)
          .then((result) => {
            file["base64"] = result;
            console.log(result)
            setFileBase64(result)
          })
          .catch((err) => {
            toast.error("Something went wrong, Try again!");
          });
      }
    } else {
      toast.error("Something went wrong, Try again!");
    }
  };




 const validate = () => {
  let result = true;
  if ('' === fullName) {
    result = false;
    toast.error('Please enter your Full Name')
    return
  }
 else if ('' === userName) {
  result = false;  
  toast.error('Please enter your User Name')
    return
  }
 else  if ('' === email) {
  result = false; 
  toast.error('Please enter your email')
    return
  }

 else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
  result = false;
  toast.error('Please enter a valid email')
    return
  }
  else  if ('' === phoneNo) {
    result = false;
    toast.error('Please enter your Phone No')
    return
  }

  else if (!/^[6-9]\d{9}$/.test(phoneNo)) {
    result = false;
    toast.error('Please enter a valid mobile no')
      return
    }
 else if ('' === description) {
  result = false;
  toast.error('Please enter a description')
    return
  }

  else if ('' === fileBase64) {
    result = false;
    toast.error('Please select Profile Photo')
      return
    }

    else if ('' === password) {
      result = false;
      toast.error('Please enter a password')
        return
      }
 else if (password.length < 7) {
  result = false;
  toast.error('The password must be 8 characters or longer')
    return
  }
  return result;
}  


 const EditProfile = (e) => {
  e.preventDefault();
  if (validate()) {
    const localuserData={
        id: userName,
        name: fullName,
        username: userName,
        password: password,
        email: email,
        phone: phoneNo,
        status: "active",
        description: description,
        imageurl:fileBase64
    }
      axios.patch("https://jsonserver-rose.vercel.app/"+`users/${userName}`,localuserData)
      .then((resp) => {
        localStorage.setItem("userdata",JSON.stringify(localuserData))   
        dispatch(setUserdata(localuserData));
        var username=localuserData.username
        router.push(`/${username}`)
      }).catch((err) => {
          console.log(err);
      });
  }
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
      <h1>Edit Profile</h1>
    <br />
    <div className={'inputContainer'}>
      <input
        value={fullName}
        placeholder="Enter your Full name here"
        onChange={(ev) => setfullName(ev.target.value)}
        className={'inputBox'}
      />
     
    </div>
    <br /> 
    <div className={'inputContainer'}>
      <input
        value={userName}
        placeholder="Enter your User Name here"
        onChange={(ev) => setuserName(ev.target.value)}
        className={'inputBox'}
        disabled
      />
    
    </div>
    <br />   
    <div className={'inputContainer'}>
      <input
        value={email}
        placeholder="Enter your email here"
        onChange={(ev) => setEmail(ev.target.value)}
        className={'inputBox'}
      />
    </div>
    <br />   
    <div className={'inputContainer'}>
      <input
        value={phoneNo}
        placeholder="Enter your Phone No here"
        onChange={(ev) => setPhoneNo(ev.target.value)}
        className={'inputBox'}
      />  
    </div>
    
    <br />
    <div className={'inputContainer'}>
      <textarea
        value={description}
        placeholder="Enter your description here"
        onChange={(ev) => setDescription(ev.target.value)}
        className={'inputBox'}
      />
    </div>
    <br />
    <div >
    <label for="formFile" class="form-label">Default file input example</label>
    <input class="form-control customfileupload" 
    type="file"
    id='formFile'
                            name="file[]"
                            className="upload-photo"                
                            onClick={(event) => {
                              event.target.value = null;
                            }}
                            onChange={(e) => handleUpload(e)}
    
    />
    </div>
    <br />
    <div className={'inputContainer'}>
      <input
        value={password}
        placeholder="Enter your password here"
        onChange={(ev) => setPassword(ev.target.value)}
        className={'inputBox'}
      />
    </div>
    <div className={'inputContainer'}>
      <input className={'inputButton'} type="button" onClick={EditProfile} value={'Sign Up'} />
    </div>


  </div>
  </div>
</div>
</>  
  );
}
