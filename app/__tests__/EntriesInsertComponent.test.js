import React from 'react';
import EntriesInsert from "../src/pages/EntriesInsert";

describe('EntriesInsert Component', () => {
    test('components function is returning payload correctly', () => {
        const instanceOfEntriesInsert = new EntriesInsert()
        const returnedPayload = instanceOfEntriesInsert.preparePayload('1','2')
        expect(returnedPayload.key).toEqual('1')
        expect(returnedPayload.value).toEqual('2')
    });
});
