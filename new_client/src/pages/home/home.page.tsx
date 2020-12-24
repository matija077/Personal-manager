import React from 'react';

import { MainStyles } from './home.styles.js';

import QuoteContainer from '../../components/quote/QuoteContainer.component';

interface Props {

}

function HomePage(props: Props) {

    return(
        <MainStyles>
            "this is Home Page"
            <QuoteContainer />
        </MainStyles>
    );
}

export default HomePage;