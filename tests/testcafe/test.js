import {Selector, t} from 'testcafe';
import {navbarModel} from "./navbar.model";
import {formModel} from './form.model'
import {tableModel} from "./table.model";

const {faker} = require('@faker-js/faker');

fixture('APG Application e2e test')
    .page('http://localhost:8000/entries/list');

test('if application name in navbar is equal to APG Application', async () => {
    await navbarModel.exists()
    await t.expect(Selector('a#navbar-brand-id').innerText).eql('APG Application')
});

test('adding new entry adds it to database', async () => {
    const randomKeyAndValue = {key: faker.random.word(), value: faker.random.numeric(2)}
    await navbarModel.exists()
    await navbarModel.clickNewEntryButton()
    await formModel.exists()
    await formModel.fillForm(randomKeyAndValue.key, randomKeyAndValue.value)
    await formModel.submitForm()
    await formModel.expectInfo(`Entry with key: ${randomKeyAndValue.key} added to database.`)
});

test('removing entry removes it from database', async () => {
    const randomKeyAndValue = {key: faker.random.word(), value: faker.random.numeric(2)}
    await navbarModel.clickNewEntryButton()
    await formModel.fillForm(randomKeyAndValue.key, randomKeyAndValue.value)
    await formModel.submitForm()
    await navbarModel.clickListEntriesButton()
    await tableModel.searchForKey(randomKeyAndValue.key)
    await t.expect(Selector('div[role=row]').find('div[role=gridcell]').withText(randomKeyAndValue.key).exists).ok()
});