import React, {Component} from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper>
                <img src={logo} width="60" height="60" alt="apg logo"/>
            </Wrapper>
        )
    }
}

export default Logo
