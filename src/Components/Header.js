import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({ isLoggedIn, handleLogout, username }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link disabled>Welcome, {username}</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    )}
                    {isLoggedIn && username === 'admin' && (
                        <LinkContainer to="/admin">
                            <Nav.Link>Admin</Nav.Link>
                        </LinkContainer>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
