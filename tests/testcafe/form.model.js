import {Selector, t} from 'testcafe'

class FormModel {
    selector = Selector('.form-group')

    keySelector = Selector('input[type=text]')
    valueSelector = Selector('input[type=number]')
    addEntryButton = Selector('.btn-primary')
    cancelButton = Selector('.btn-secondary')

    dialogContentSelector = Selector('.dialog-content')

    get message() {
        return 'Thank you for your message, we will contact you as soon as possible'
    }

    fillForm = async (key, value) => {
        await t.typeText(this.keySelector, key, {replace: true})
        await t.typeText(this.valueSelector(), value, {replace: true})
    }

    submitForm = async () => {
        await t.click(this.addEntryButton)
    }

    cancel = async () => {
        await t.click(this.cancelButton)
    }

    expectInfo = async (info) => {
        await t.expect(this.dialogContentSelector.withText(info).exists).ok()
    }

    exists = async () => {
        await t.expect(this.selector.exists).ok('form should exists')
    }
}


export const formModel = new FormModel()