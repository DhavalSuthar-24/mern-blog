import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className='min-h-screen mt-20 '>
     <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
     {/* left */}
      <div className="flex-1">
     <Link to="/" className='  font-bold dark:text-white text-4xl'>
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Dk's</span>Blog
</Link>
<p className="text-sm mt-5">
  this is demo page ...................
  project not page............ auth with google
</p>

     </div>
     {/* right */}
     <div className="flex-1">
<form action="" className="flex flex-col gap-4">
<div className>
  <Label value="Username"/>
  <TextInput type="text" placeholder="Enter your username" id="username"/>


</div>
<div className>
  <Label value="Email"/>
  <TextInput type="email" placeholder="Enter your email" id="email"/>


</div>
<div className>
  <Label value="Password"/>
  <TextInput type="password" placeholder="Enter Your assword" id="password"/>


</div>
<Button gradientDuoTone='purpleToPink' type="submit">
  Sign Up
</Button>

</form>
<div className=" flex gap-2 text-sm mt-5">
  <span>Have an account</span>
  <Link to="/signin" className="text-blue-500">Sign In</Link>
</div>
</div>
</div>
</div>
  )
}

export default Signup