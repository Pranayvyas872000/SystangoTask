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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
        axios.get("https://jsonserver-rose.vercel.app/"+"/users/" + username)
        .then((resp) => {
            if (Object.keys(resp.data).length === 0) { 
                toast.error('Please Enter valid username');
            } else {
                if (resp.data.password === password) {
                  localStorage.setItem("userdata",JSON.stringify(resp.data))                  
                  dispatch(setUserdata(resp.data))
                  var username=resp.data.username
                  router.push(`/${username}`)
                }else{
                    toast.error('Please Enter valid credentials');
                }
            }
        }).catch((err) => {
          toast.error('Please Enter valid username');
        });
    }
}
const validate = () => {
  let result = true;
  if (username === '') {
      result = false;
      toast.error('Please Enter username');
  }
  else if (password === '' ) {
      result = false;
      toast.error('Please Enter Password');
  }
  return result;
}


  return (
    <div className={'mainContainer'}>
    <div className={'titleContainer'}>
      <div>Login</div>
    </div>
    <br />
    <div className={'inputContainer'}>
      <input
        value={username}
        placeholder="Enter your username here"
        onChange={(ev) => setUsername(ev.target.value)}
        className={'inputBox'}
      />
    </div>
    <br />
    <div className={'inputContainer'}>
      <input
        value={password}
        type='password'
        placeholder="Enter your password here"
        onChange={(ev) => setPassword(ev.target.value)}
        className={'inputBox'}
      />    
    </div>
    <br />
    <div className={'inputContainer'}>
      <input className={'inputButton'} type="button" onClick={ProceedLogin} value={'Log in'} />
    </div>
  </div>
  );
}
