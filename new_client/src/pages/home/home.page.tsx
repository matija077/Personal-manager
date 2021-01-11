import { useState, useLayoutEffect, useCallback } from 'react';
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

    var closePopupIfOpenMemo = useCallback(
        closePopupIfOpen,
        [popup]
    )

    useLayoutEffect(() => {
        popup && window.addEventListener("keyup", onEscPressedMainStyles);

        function onEscPressedMainStyles(event: any): void {
            if (event.code === "Escape") {
                closePopupIfOpenMemo();
            }
        }

        return () => {
            window.removeEventListener("keyup", onEscPressedMainStyles);
        }
    }, [popup, closePopupIfOpenMemo])


    function closePopupIfOpen(){
        if (popup) {
            setPopup(null);
        }
    }


    function onClickHandlerHomePageSection(event: any): void {
        if (!popup)  {
            setPopup(event?.currentTarget?.dataset.id || null);
        }
    }

    function onClickHandlerMainStyles(event: any): void {
        closePopupIfOpen();
    }

    function onClickHandlerPopup(event: any): void {
        event.stopPropagation();
    }


    let PopupComponentChild: ((props: any) => JSX.Element) | null = null;
    const mainComponentId = "Main Component"

    // for some reason state fro msetState hook is an object. need to cast ti to number
    if (popup) {
        PopupComponentChild = componentMap.get(+popup) || null;
    }

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