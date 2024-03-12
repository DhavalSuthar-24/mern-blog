import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../Components/DashSidebar";
import Dashprofile from "../Components/Dashprofile";

const Dashboard = () => {
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
    <div className="min-h-screen flex flex-col md:flex-row">
     
<div className="">

 <DashSidebar/>
</div>
{
  tab === 'profile' && <Dashprofile/>
}

    </div>
  )
}

export default Dashboard