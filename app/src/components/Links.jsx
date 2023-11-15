import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/entries/list" className="navbar-brand" id="navbar-brand-id">
                    APG Application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/entries/list" className="nav-link" id="navbar-link-to-list-entries">
                                List entries
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/entries/create" className="nav-link" id="navbar-link-to-add-entry-form">
                                Add entry
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
