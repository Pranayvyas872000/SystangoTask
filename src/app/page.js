'use client';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  setUserdata,
} from "../component/redux/slices/postsSlice";  
import { useRouter } from 'next/navigation'

export default function Home() {
 
 
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const router = useRouter()
useEffect(()=>{
var userdata= localStorage.getItem("userdata")
console.log(userdata)
if(!(userdata==undefined&&userdata==null))
{
  userdata= JSON.parse(userdata)
  router.push(`/${userdata.id}`)
  dispatch(setUserdata(userdata));
}
else
{
  router.push('/login')
}
},[])
  return (
    <div>

    </div>
  );
}
