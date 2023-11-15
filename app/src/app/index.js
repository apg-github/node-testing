import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import {NavBar} from '../components'
import {EntriesList, EntriesInsert, EntriesUpdate} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/entries/list" exact component={EntriesList}/>
                <Route path="/entries/create" exact component={EntriesInsert}/>
                <Route
                    path="/entries/update/:id"
                    exact
                    component={EntriesUpdate}
                />
                <Route exact path="/">
                    <Redirect to="/entries/list"/>
                </Route>
                <Route path='*' exact>
                    <Redirect to="/entries/list" />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
