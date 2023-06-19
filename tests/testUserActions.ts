import {describe, expect, it} from "@jest/globals";

describe('test action', () => {

    it('should create an action with ADD_FAVORITE_NOUNOURS type', () => {
        const payload = new Nounours("Chewie", 42, 10000, "https://monuri.png");
        const expectation = {
            type: 'ADD_FAVORITE_NOUNOURS',
            nounours: payload,
        };

        expect(addFavoriteNounours(payload)).toEqual(expectation);
    });
})