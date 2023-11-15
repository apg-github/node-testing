const assert = require('assert')
const {When, Then} = require('@cucumber/cucumber')

When('The form responds by some response', () => {
    this.formResponse = 'Thank you for your message, we will contact you as soon as possible.'
});

Then('I should have heard {string}', (expectedResponse) => {
    assert.equal(this.formResponse, expectedResponse)
});