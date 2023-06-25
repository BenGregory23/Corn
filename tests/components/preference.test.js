import React from 'react';
import {expect} from '@jest/globals';
import Preferences from "../../components/Preferences";

import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {fireEvent, render, screen} from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect';
import testReducer from "../../redux/reducers/testReducer";
import {darkTheme, lightTheme} from "../../theme/theme"

jest.useFakeTimers()

// Configure store for testing
const store = configureStore({
    reducer: {
        appReducer: testReducer
    }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});



// When using a Data Provider (like redux) in your App, you will need to wrap all your tested component into a test Provider
// You cannot use the exact same provider and store you create in App.tsx file because here you want mocked data into your store
const Wrapper = ({children}) => (<Provider store={store}>{children}</Provider>);

// This is the test suite for Preference component

describe('<Preference />', () => {

    test("Assert displayed values are correct", () => {
        // depending on the language, the text will be different
        const {getByText} = render(<Preferences theme={lightTheme} />, {wrapper: Wrapper});
        expect(getByText('Movie providers')).toBeTruthy();
    })  

});




