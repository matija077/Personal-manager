import React from 'react';

import { MainStyles } from './home.styles.js';

import QuoteContainer from '../../components/quote/QuoteContainer.component';
import TodaysTasksContainer from '../../components/todays tasks/TodaysTasksContainer.component';

interface Props {

}

function HomePage(props: Props) {

    return(
        <MainStyles>
            "this is Home Page"
            <QuoteContainer />
            <TodaysTasksContainer />
        </MainStyles>
    );
}

export default HomePage;