import { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { MainStyles, PopupContainerStyles, MainContainerStyles } from './home.styles';

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
    var [popup, setPopup] : [0 | 1 | 2 | null, Function] = useState(null);
    var PopupComponentChild: ((props: any) => JSX.Element) | null = null;

    function onClickHandlerHomePageSection(event: any): void {
        console.log("c;ikekd");

        if (!popup)  {
            setPopup(event?.currentTarget?.dataset.id || null);
        }
    }

    function onClickHandlerMainStyles(event: any): void {
        console.log("c;ikekd 2");
        if (popup) {
            setPopup(null);
        }
    }

    function onClickHandlerPopup(event: any): void {
        console.log("c;ikekd 3");
        event.stopPropagation();
    }

    if (popup) {
        console.log(popup);
        PopupComponentChild = componentMap.get(+popup) || null;
    }

    const mainComponentId = "Main Component"

    return (
        <MainStyles
            id={mainComponentId}
            onClick={onClickHandlerMainStyles}
        >
            <MainContainerStyles
                popup={popup}
            >
                <HomePageSection
                    onClickHandler={onClickHandlerHomePageSection}
                    component={components.Summary}
                >
                    <Quote
                    >
                    </Quote>
                </HomePageSection>
                <HomePageSection
                    onClickHandler={onClickHandlerHomePageSection}
                    component={components.TodaysTasks}
                >
                    <TodaysTasks

                    >
                    </TodaysTasks>
                </HomePageSection>
                <HomePageSection
                    onClickHandler={onClickHandlerHomePageSection}
                    component={components.Summary}
                >
                    <Summary
                    >
                    </Summary>
                </HomePageSection>
            </MainContainerStyles>
            {popup && PopupComponentChild ?
                <Popup
                    onClickHandler={onClickHandlerPopup}
                >
                    <PopupComponentChild
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



/*
{popup && PopupComponentChild ?
                ReactDOM.createPortal(<Popup>
                    <PopupComponentChild
                        onClickHandler={onClickHandler}
                    >

                    </PopupComponentChild>
                </Popup>, element)
            :
                null
            }
            */