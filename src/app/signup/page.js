'use client'
import React, { useState } from 'react'

import Image from "next/image";
import { toast } from "react-toastify";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {
  setUserdata,
} from "../../component/redux/slices/postsSlice";  
import { useRouter } from 'next/navigation'
export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()

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


  const ProceedSignUp = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData={
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
     const url= "https://jsonserver-rose.vercel.app/"+"users"
        axios.post(url,userData)
        .then((resp) => {
          localStorage.setItem("userdata",JSON.stringify(userData))   
          dispatch(setUserdata(userData));
          toast.success('Success');
          var username=userData.username
                  router.push(`/${username}`)
        }).catch((err) => {
            
        });
    }
}

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
  return (
    <div className={'mainContainer'}>
    <div className={'titleContainer'}>
      <div>Signup</div>
    </div>
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
    <label htmlFor="formFile" className="form-label">Default file input example</label>
    <input className="form-control customfileupload upload-photo" 
    type="file"
    id='formFile'
                            name="file[]"     
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
      <button className={'inputButton'} type="button" onClick={ProceedSignUp}  >
      Sign Up
      </button>
    </div>
  </div>
  );
}
