import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { signOutSuccess } from "../redux/user/user.slice";
import {  useDispatch } from "react-redux";
function DashSidebar() {
    const location = useLocation();
    const[tab,settab] =useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      settab(tabFromUrl)
    }
    
    },[location.search])
    const handleSignout = async()=>{
      try{
            const res = await fetch('/api/user/signOut',{
              method:'POST'}
  
            )
            const data = await res.json();
  
           if(!res.ok){
              console.log(data.message)
           }else{
              dispatch(signOutSuccess())
           }
  
           }
  
      catch(e){
          console.log(e.message)
      }
  
  
        }
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard/?tab=profile'>
                <Sidebar.Item active={tab==="profile"} icon={ HiUser} label={"user"} labelColor="dark" as='div' >
                    Profile
                    </Sidebar.Item></Link>
                    <Sidebar.Item onClick={handleSignout} className="cursor-pointer"  icon={ HiArrowSmRight}   >
                    Sign out
                    </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar