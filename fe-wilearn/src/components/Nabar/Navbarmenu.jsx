import AvatarUser from "../AvatarUser";
import { Nav, NavLink, Bars, NavMenu} from "./NavbarElements";
import Search from "./Search";


export default function Navbarmenu() {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/homeMenu" >
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Contact
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                    <Search/>
                </NavMenu>              
                <AvatarUser/>
            </Nav>
        </>
    );
}
