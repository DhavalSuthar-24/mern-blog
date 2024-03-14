import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { signOutSuccess } from "../redux/user/user.slice";
import {  useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function DashSidebar() {
    const location = useLocation();
    const {currentUser} = useSelector((state)=>state.user)
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
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                <Link to='/dashboard/?tab=profile'>
                <Sidebar.Item active={tab==="profile"} icon={ HiUser} label={currentUser.isAdmin?"Admin":"User"} labelColor="dark" as='div' >
                    Profile
                    </Sidebar.Item></Link>
                    {
                      currentUser.isAdmin &&(
                         <Link to='/dashboard/?tab=posts'>
                    <Sidebar.Item active={tab==="posts"} icon={ HiDocumentText} label={"posts"} labelColor="dark" as='div'  as='div'>
                    Posts
                    </Sidebar.Item></Link>
                      )
                    }
                    {
                      currentUser.isAdmin &&(
                         <Link to='/dashboard/?tab=users'>
                    <Sidebar.Item active={tab==="posts"} icon={HiOutlineUserGroup } label={"posts"} labelColor="dark" as='div'  as='div'>
                    Users
                    </Sidebar.Item></Link>
                      )
                    }
                   
                    <Sidebar.Item onClick={handleSignout} className="cursor-pointer"  icon={ HiArrowSmRight}   >
                    Sign out
                    </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar