import React, {Component} from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class EntriesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            key: '',
            value: '',
        }
    }

    handleChangeInputName = async event => {
        const key = event.target.value
        this.setState({key})
    }

    handleChangeInputValue = async event => {
        const value = event.target.validity.valid
            ? event.target.value
            : this.state.value

        this.setState({value})
    }

    handleUpdateEntry = async () => {
        const {id, key, value} = this.state
        const time = new Date().toLocaleString()
        const payload = {key, value, time}

        await api.updateEntryById(id, payload).then(res => {
            window.alert(`Entry updated successfully`)
            this.setState({
                key: '',
                value: '',
            })
        }).catch(e => {
            alert("Entry value must be a number between 0 and 1000.")
        })
    }

    componentDidMount = async () => {
        const {id} = this.state
        const entry = await api.getEntryById(id)

        this.setState({
            key: entry.data.data.key,
            value: entry.data.data.value,
            time: entry.data.data.time,
        })
    }

    render() {
        const {key, value} = this.state
        return (
            <Wrapper>
                <Title>Edit Entry</Title>

                <Label>Key:</Label>
                <InputText
                    type="text"
                    value={key}
                    onChange={this.handleChangeInputName}
                />

                <Label>Value:</Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="1000"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={value}
                    onChange={this.handleChangeInputValue}
                />

                <Button onClick={this.handleUpdateEntry}>Update Entry</Button>
                <CancelButton href={'/entries/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default EntriesUpdate
