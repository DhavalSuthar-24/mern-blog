import { useSelector,useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon ,FaSun} from 'react-icons/fa';
import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react';
import {toggleTheme} from '../redux/theme/themSlice'
const Header = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
const {theme } = useSelector(state=>state.theme)
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Dk's Blog</span>
      </Link>
      <form>
        <TextInput className='hidden lg:inline' type='text' placeholder='Search.........' rightIcon={AiOutlineSearch} />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="grey" pill><AiOutlineSearch /></Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='grey' pill onClick={()=>{
          dispatch(toggleTheme())
        }}>{
          theme === 'light'? <FaMoon /> : <FaSun />
        }

          </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar alt='user' img={currentUser.profilepic} rounded />
          }>

           <Dropdown.Header>
            <span className="black text-sm ">@{currentUser.username}</span>
            <span className="black text-sm  font-medium truncate">{currentUser.email}</span>
           </Dropdown.Header>
           <Link to={"/dashboard?tab=profile"}>
            <Dropdown.Item>Profile</Dropdown.Item>
           </Link>
           <DropdownDivider/>
           <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button color="grey" gradientDuoTone='purpleToBlue' outline>Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
