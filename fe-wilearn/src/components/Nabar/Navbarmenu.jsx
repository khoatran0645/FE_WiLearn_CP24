import AvatarUser from "../AvatarUser";
import { Nav, NavLink, Bars, NavMenu} from "./NavbarElements";
import Search from "./Search";


export default function Navbarmenu() {
    const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };
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
                    <NavLink to="/" activeStyle>
                        Logout
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                    <Search onSearch={handleSearch} />
                </NavMenu>
                <AvatarUser/>
                <div style={{marginTop:'30px', fontSize:'20px', fontWeight:'bold'}}>Thuy Linh</div>
            </Nav>
        </>
    );
}
