import React, {Component} from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    // className: 'container',
})`
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light bg-light',
})`
    margin: 40px;
    width: 100%;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo/>
                    <Links/>
                </Nav>
            </Container>
        )
    }
}

export default NavBar
