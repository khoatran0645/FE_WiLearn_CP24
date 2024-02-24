import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";


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
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
}
