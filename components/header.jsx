import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { useState, useEffect } from 'react'
import { auth, db } from '../services/firebase'
import { ref, get, child } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header(props) {

  const [user, loading] = useAuthState(auth)
  const [userData, setUserData] = useState({})
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const handleNavbar = () => {
      setIsOpen(!isOpen)
    }

    function fetchUserdata() {
        get(child(ref(db), `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val(), 'ini dari header biasa');
              setUserData(snapshot.val());
              console.log(user.email)
              console.log(userData, "ini userdata");
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      useEffect(() => {
        if (loading) return;
        fetchUserdata();
      }, []);


    return(
        <div>
            <Navbar
            color="dark"
            dark
            expand="md"
            fixed="off"
            className='navbar'
            >
                <NavbarBrand className='navbrand' href="/landing-page">
                    {props.title}
                </NavbarBrand>
                <NavbarToggler onClick={handleNavbar} />
                <Collapse isOpen = {isOpen ? isOpen : ""} navbar>
                    <Nav
                    className="mx-auto"
                    navbar
                    >
                    <NavItem className={router.pathname == "/" ? "active" : "navitem"}>
                        <Link href="/">
                        <a className='text-link'>HOME</a>
                        </Link>
                    </NavItem>
                    <NavItem className={router.pathname == "/game-list" ? "active" : "navitem"}>
                        <Link href="/game-list">
                        <a className='text-link'>LIST GAME</a>
                        </Link>
                    </NavItem>
                    <NavItem className={router.pathname == "/leaderboard-page" ? "active" : "navitem"}>
                        <Link href="/leaderboard-page">
                        <a className='text-link'>LEADERBOARD PAGE</a>
                        </Link>
                    </NavItem>
                    {/* <NavItem className='navitem'>
                        <Link href="/game-detail-page">
                        <a className='text-link'>LIST DETAIL GAME</a>
                        </Link>
                    </NavItem> */}
                    </Nav>
                    <Nav
                    className="me-end"
                    navbar>
                    <NavItem className={router.pathname == "/register-page" ? "active" : "navitem"}>
                        <Link className='navlink' href='/register-page'>
                        <a className='text-link'>REGISTER</a>
                        </Link>
                    </NavItem>
                    <NavItem className={router.pathname == "/login-page" ? "active" : "navitem"}>
                        <Link className='navlink' href="/login-page">
                        <a className='text-link'>LOGIN</a>
                        </Link>
                    </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}