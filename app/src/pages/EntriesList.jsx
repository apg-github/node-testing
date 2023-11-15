import React, {Component} from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.4s ease-in-out;
    margin: 5px;
    &:hover {
     background-color: #FFD580;
     cursor: pointer;
    }
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.4s ease-in-out;
    margin: 5px;
    &:hover {
     background-color: #FFCCCB;
     cursor: pointer;
    }
`

class UpdateEntry extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/entries/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteEntry extends Component {
    deleteEntry = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Do you want to delete entry ${this.props.id} permanently?`,
            )
        ) {
            api.deleteEntryById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return (
            <Delete onClick={this.deleteEntry}>Delete</Delete>
        )
    }
}

class EntriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({isLoading: true})

        try {
            await api.getAllEntries().then(entries => {
                this.setState({
                    entries: entries.data.data,
                    isLoading: false,
                })
            })
        } catch (e) {
            this.setState({isLoading: false})
        }

    }

    render() {
        const {entries} = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                style: {
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                    'textAlign': 'center'
                },
                filterable: true,
                sortable: false,
            },
            {
                Header: 'Key',
                accessor: 'key',
                style: {
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                    'textAlign': 'center'
                },
                filterable: true,
            },
            {
                Header: 'Value',
                accessor: 'value',
                style: {
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                    'textAlign': 'center'
                },
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                style: {
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                    'textAlign': 'center'
                },
            },
            {
                Header: '',
                accessor: '',
                style: {textAlign: 'center'},
                maxWidth: 200,
                minWidth: 100,
                sortable: false,
                Cell: (props) => {
                    return (
                        <span>
                            <DeleteEntry
                                id={props.original._id}/>
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                style: {textAlign: 'center'},
                maxWidth: 200,
                minWidth: 100,
                sortable: false,
                Cell: (props) => {
                    return (
                        <span>
                            <UpdateEntry id={props.original._id}/>
                        </span>
                    )
                },
            },
        ]

        return (
            <Wrapper>
                {(
                    <ReactTable
                        data={entries}
                        columns={columns}
                        loading={this.state.isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                        NoDataComponent={() => null}
                    />
                )}
            </Wrapper>
        )
    }
}

export default EntriesList
