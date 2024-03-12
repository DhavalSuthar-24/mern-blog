import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
function DashSidebar() {
    const location = useLocation();
    const[tab,settab] =useState('')
    
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      settab(tabFromUrl)
    }
    
    },[location.search])
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard/?tab=profile'>
                <Sidebar.Item active={tab==="profile"} icon={ HiUser} label={"user"} labelColor="dark" >
                    Profile
                    </Sidebar.Item></Link>
                    <Sidebar.Item className="cursor-pointer"  icon={ HiArrowSmRight}   >
                    Sign out
                    </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar