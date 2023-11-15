import {Selector, t} from 'testcafe'

class NavbarModel {
    selector = Selector('.navbar-light')
    listEntriesButton = Selector('#navbar-link-to-list-entries')
    addNewEntryButton = Selector('#navbar-link-to-add-entry-form')

    clickListEntriesButton = async () => {
        await t.click(this.listEntriesButton)
    }

    clickNewEntryButton = async () => {
        await t.click(this.addNewEntryButton)
    }

    exists = async () => {
        await t.expect(this.selector.exists).ok('navbar should exists')
    }
}


export const navbarModel = new NavbarModel()