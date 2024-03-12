import { Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"
const Dashprofile = () => {
    const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semiboldc text-3xl ">Profile</h1>
        <form className="flex flex-col gap-4 " >
            <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
                <img src={currentUser.profilepic} alt="user" className="self-center  w-full h-full border-4 object-cover  border-gray-300"/>


            </div>
              

                  <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}></TextInput>
                  <TextInput type="email" id="email" placeholder="username" defaultValue={currentUser.email}></TextInput>
                  <TextInput type="password" id="password" placeholder="Password" ></TextInput>
                  <Button gradientDuoTone="purpleToBlue" type="submit" outline >Update</Button>
        </form>
        <div className="text-red-500 flex justify-between  mt-5 ">
            <span className="cursor-pointer" >
                Delete Account
            </span>
            <span className="cursor-pointer" >
                Sign out
            </span>
        </div>
    </div>
  )
}

export default Dashprofile