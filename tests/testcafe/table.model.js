import {Selector, t} from 'testcafe'

class TableModel {
    selector = Selector('.ReactTable')

    idSearchSelector = Selector('input[type=text').nth(0)
    keySearchSelector = Selector('input[type=text').nth(1)
    valueSearchSelector = Selector('input[type=text').nth(2)

    searchForId = async (id) => {
        await t.typeText(this.idSearchSelector, id)
    }

    searchForKey = async (key) => {
        await t.typeText(this.keySearchSelector, key)
    }

    searchForValue = async (value) => {
        await t.typeText(this.valueSearchSelector, value)
    }

    exists = async () => {
        await t.expect(this.selector.exists).ok('table should exists')
    }
}


export const tableModel = new TableModel()