import React, {Component} from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h2',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 40px;
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
    margin: 20px 20px 20px 10px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-secondary`,
})`
    margin: 20px 20px 20px 10px;
`

class EntriesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            key: '',
            value: '',
            entryInsertedSuccessfully: false,
            lastInsertedKey: '',
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

    preparePayload = (key, value) => {
        return {
            key, value, time: new Date().toLocaleString()
        }
    }

    handleAddEntry = async () => {
        const {key, value} = this.state
        const payload = this.preparePayload(key, value)
        this.setState({entryInsertedSuccessfully: false})
        await api.insertEntry(payload).then(res => {
            this.setState({
                lastInsertedKey: this.state.key,
                key: '',
                value: '',
                entryInsertedSuccessfully: true
            })
        }).catch(async e => {
            alert('Value must be a number within range 0 to 1000.')
        })
    }

    render() {
        const {key, value} = this.state
        return (
            <Wrapper>
                <Title>Add entry to database</Title>

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

                <Button onClick={this.handleAddEntry}>Add Entry</Button>
                <CancelButton href={'/entries/list'}>Cancel</CancelButton>
                {this.state.entryInsertedSuccessfully && (
                    <div className="dialog">
                        <div className="dialog-content">
                            <span>Entry with key: {this.state.lastInsertedKey} added to database.</span>
                        </div>
                    </div>
                )}
            </Wrapper>
        )
    }
}

export default EntriesInsert
