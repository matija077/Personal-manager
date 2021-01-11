import { useState } from 'react';

import { MainStyles, PopupContainerStyles } from './home.styles.js';

import Quote from '../../components/quote/Quote.component';
import TodaysTasks from '../../components/todays tasks/TodaysTasks.component';
import Summary from '../../components/summary/summary.component';
import Popup from '../../components/popup/popup';
import HomePageSection from '../../components/homePageSection/homePageSection';

type HomeContainerPropsType = {
    children?: []
};

export type popupsComponentPropsType = {
    onClickHandler: (event: any) => void,
    component?: 0 | 1 | 2,
    children: JSX.Element
}

enum components {
    "Quote",
    "TodaysTasks",
    "Summary"
}

console.log(components.Quote);

var componentMap:Map<components, (props: any) => JSX.Element> = new Map([
    [components.TodaysTasks, TodaysTasks],
    [components.Quote, Quote],
    [components.Summary, Summary]
]);


function HomePage(props: HomeContainerPropsType) {
    //var popupRender = (popupNumber && componentMap.get(popupNumber)) || null;
    var [popup, setPopup] : [0 | 1 | 2 | null, Function] = useState(null);
    var PopupComponentChild: ((props: any) => JSX.Element) | null = null;

    function onClickHandler(event: any): void {
        console.log("c;ikekd");
        console.log(typeof event.currentTarget.dataset);

        setPopup(event?.currentTarget?.dataset.id || null);
    }

    //console.log(typeof +popup)

    if (popup) {
        PopupComponentChild = componentMap.get(+popup) || null;
    }

    return (
        <MainStyles>
            <HomePageSection
                onClickHandler={onClickHandler}
                component={components.Summary}
            >
                <Quote
                >
                </Quote>
            </HomePageSection>
            <HomePageSection
                onClickHandler={onClickHandler}
                component={components.TodaysTasks}
            >
                <TodaysTasks

                >
                </TodaysTasks>
            </HomePageSection>
            <HomePageSection
                onClickHandler={onClickHandler}
                component={components.Summary}
            >
                <Summary
                >
                </Summary>
            </HomePageSection>
            {popup && PopupComponentChild ?
                <Popup>
                    <PopupComponentChild
                        onClickHandler={onClickHandler}
                    >

                    </PopupComponentChild>
                </Popup>
            :
                null
            }
        </MainStyles>
    );
}

export default HomePage;