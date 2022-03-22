import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, DropdownToggle, Navbar, NavbarToggler, UncontrolledDropdown, NavbarBrand, Nav, NavItem, NavLink, DropdownMenu, DropdownItem, Progress } from "reactstrap";

const NavigationBar = () => {

    const [groupData, setGroupData] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [isLoading, setLoading] = useState(false)

    if(typeof window !== "undefined"){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('Token')
            },
        }
    }

    const getGroupData = (groupId) => {
        setLoading(true)
        fetch(`http://localhost:8000/group/` + groupId + `/`, requestOptions)
          .then((res) => res.json())
          .then((groupData) => {
            setGroupData(groupData)
            console.log("groupData:", groupData)
          })
        setLoading(false)
    }

    const removeGroupInLocalStorage = () => {
        if (typeof window !== "undefined") localStorage.setItem("group", "");
    }

    useEffect(() => {
        const groupId = typeof window !== "undefined" ? localStorage.getItem("group") : null
        if (groupId != null){
            setGroupId(groupId);
            getGroupData(groupId);
        }
    }, [])

    if (isLoading) return <><p>Loading...</p><Progress animated color="info" value={100} /></>

    console.log("groupId:", groupId);
    console.log("groupData:", groupData);

    return ( 
        <div>
            <Navbar 
                color="light"
                expand="md"
                light 
                group="">

                <NavbarBrand
                className="me-auto" 
                    href="/">
                    GroupUp
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}}/>
                <Collapse navbar>

                    <Nav navbar>
                        <NavItem class="
                            px-3 
                            nav-item py-md-2">
                            <NavLink href="/profile" onClick={removeGroupInLocalStorage}>Min Profil</NavLink>
                        </NavItem>
                        
                        <NavItem class="
                        px-3 
                        nav-item py-md-2">
                            <NavLink href="/myGroups" onClick={removeGroupInLocalStorage}>Mine Grupper</NavLink>
                        </NavItem>
                        
                        {groupId && groupData &&
                            <UncontrolledDropdown 
                                inNavbar 
                                nav
                                class="px-3 nav-item py-md-2"
                                >
                                <DropdownToggle 
                                caret
                                nav>
                                {groupData.name}
                                </DropdownToggle>
                                <DropdownMenu left>
                                    <DropdownItem href="/groupProfile">Gruppeprofil</DropdownItem>
                                    <DropdownItem href="/matchedGroups">Matchede grupper</DropdownItem>
                                    <DropdownItem href="/findGroups">Finn nye grupper</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
            
        </div>
    )
}

export default NavigationBar;