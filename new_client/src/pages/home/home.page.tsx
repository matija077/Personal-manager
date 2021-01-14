import { useState, useLayoutEffect, useCallback, useMemo, useEffect, useRef } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { MainStyles, PopupContainerStyles, MainContainerStyles } from './home.styles';

import Quote from '../../components/quote/Quote.component';
import TodaysTasks from '../../components/todays tasks/TodaysTasks.component';
import Summary from '../../components/summary/summary.component';
import Popup from '../../components/popup/popup';
import HomePageSection from '../../components/homePageSection/homePageSection';
import Close from '../../components/close/close.component';

import { queries, mutations } from '../../graphQL/resolvers';
import { useConsoleLogQueries, useError } from '../../utility/customHooks.utils';

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

var componentMap:Map<components, (props: any) => JSX.Element> = new Map([
    [components.TodaysTasks, TodaysTasks],
    [components.Quote, Quote],
    [components.Summary, Summary]
]);


function HomePage(props: HomeContainerPropsType) {
    var [popup, setPopup] : [0 | 1 | 2 | null, Function] = useState(null);
    var [error, setError] = useError();

    var skipRef  = useRef(false);
    var { loading: loadingQuotes, error: errorQuotes, data: quotes } : 
    {loading: boolean, error?: any, data: any} = useQuery(queries.GET_QUOTES);
    var { loading: loadingTasks, error: errorTasks, data: tasks } : 
    {loading: boolean, error?: any, data: any} = useQuery(queries.GET_TASKS);
    var [ saveTask, {data, loading, error} ] = useMutation(mutations.SAVE_TASK) as  
    [(object: any) => {}, {data: any, loading: boolean, error?: any}];
    useConsoleLogQueries(loadingQuotes, errorQuotes, quotes, "quotes");
    useConsoleLogQueries(loadingTasks, errorTasks, tasks, "tasks");
    
    var task = {
        category: "olaaaaaa",
        name: "testic",
        location: "",
        description: ""
    };
    useEffect(() => {
        console.log(saveTask);
        saveTask({
            variables: {
               task
            }
        });
    }, [saveTask])
    /**/

    var closePopupIfOpenMemo = useCallback(
        closePopupIfOpen,
        [popup]
    )

    useLayoutEffect(() => {
        function onEscPressedMainStyles(event: any): void {
            if (event.code === "Escape") {
                closePopupIfOpenMemo();
            }
        }

        popup && window.addEventListener("keyup", onEscPressedMainStyles);

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

    function onClickHandlerPopupClose(event: any): void {
        closePopupIfOpen();
    }

    function onClickHandlerPopup(event: any): void {
        event.stopPropagation();
    }


    let PopupComponentChild: ((props: any) => JSX.Element) | null = null;
    const mainComponentId = "Main Component"
    const closePosition = {
        right: "1rem",
        top: "1rem",
    }

    // for some reason state fro msetState hook is an object. need to cast ti to number
    if (popup) {
        console.log(popup);
        console.log(componentMap.get(+popup));
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
                    component={components.Quote}
                >
                    <Quote
                        quote={quotes?.quotes[0]}
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
                    <>
                        <Close
                            onClickHandler={onClickHandlerPopupClose}
                            position={closePosition}
                        >
                        </Close>
                        <PopupComponentChild

                        >
                        </PopupComponentChild>
                    </>
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