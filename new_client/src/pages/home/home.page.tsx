import { useState } from 'react';

import { MainStyles, PopupContainerStyles } from './home.styles.js';

import Quote from '../../components/quote/Quote.component';
import TodaysTasks from '../../components/todays tasks/TodaysTasks.component';
import Summary from '../../components/summary/summary.component';
import Popup from '../../components/popup/popup';
import { MapLike } from 'typescript';

type HomeContainerPropsType = {
    children?: []
};

export type popupsComponentPropsType = {
    onClickHandler: (event: any) => void,
    component?: 0 | 1 | 2,
    children: never[]
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
        console.log(event.currentTarget.dataset);

        setPopup(event?.currentTarget?.dataset.id || null);
    }

    //console.log(typeof +popup)

    if (popup) {
        PopupComponentChild = componentMap.get(+popup) || null;
    }

    return (
        <MainStyles>
            <Quote
                onClickHandler={onClickHandler}
                component={components.Quote}
            >
            </Quote>
            <TodaysTasks
                onClickHandler={onClickHandler}
                component={components.TodaysTasks}
            >
            </TodaysTasks>
            <Summary
                onClickHandler={onClickHandler}
                component={components.Summary}
            >
            </Summary>
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