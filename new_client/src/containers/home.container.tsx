import React, { useEffect, useRef, useMemo, useState, useContext, createContext } from 'react';
import { QueryResult, useMutation, useQuery } from '@apollo/client';

import { useSelector } from 'react-redux';
import { getTasks } from '../redux/task-reducer/task-reducer.selectors';

import { queries, mutations } from '../graphQL/resolvers';
import { contextDataType, contextType, quotesType } from '../graphQL/types';
import { useConsoleLogQueries, useError } from '../utility/customHooks.utils';

//import contextContainer from './contextContainer';

type withHomePagePropsType = {
    //currentProp: String
}

type withHomePageIntersectionTPropsType<T> = withHomePagePropsType & T;

type quotesContextType = contextType<quotesType>;
type taskContextType = contextType<any>;

export type renderFunctionType = {
    Component: React.ComponentType<unknown>,
    componentsProps: unknown,
    context: any
};

export type contextsType = {
    quotesContext: React.Context<quotesContextType>,
    taskContext: React.Context<taskContextType>
}

const taskContext = createContext<taskContextType>(null);
export function useTaskContext() {
    return useContext(taskContext);
}

const quotesContext = createContext<quotesContextType>(null);
export function useQuotesContext() {
    return useContext(quotesContext);
}

function withHomePage<T>( WrappedComponent: React.ComponentType<T>) {
    return function WithHomePage(props: withHomePageIntersectionTPropsType<T>) {
        const reduxTasks = useSelector(getTasks);

        var { loading: loadingQuotes, error: errorQuotes, data: quotes } :
        {loading: boolean, error?: any, data: contextDataType<quotesType>} = useQuery(queries.GET_QUOTES);
        var { loading: loadingTasks, error: errorTasks, data: tasks } :
        {loading: boolean, error?: any, data: any} = useQuery(queries.GET_TASKS);
        var [ saveTask, {data, loading, error} ] = useMutation(mutations.SAVE_TASK) as
        [(object: any) => {}, {data: any, loading: boolean, error?: any}];
        useConsoleLogQueries(loadingQuotes, errorQuotes, quotes, "quotes");
        useConsoleLogQueries(loadingTasks, errorTasks, tasks, "tasks");
        useConsoleLogQueries(loading, error, data, "mutation");

        var task = useMemo(() => {
            return {
                category: "olaaaaaa",
                name: "testic",
                location: "",
                description: ""
            }
        }, []);

        var testTask = useRef({
            name: "chiquita"
        });

        /*useEffect(() => {
            console.log(saveTask);
            saveTask({
                variables: {
                    task
                }
            });
        }, [saveTask, task])*/

        var {...rest}: any = props
        const taskProviderValue = useMemo(() => ({
            data: tasks,
            loading: loadingTasks,
            error: errorTasks
        }), [tasks, loadingTasks, errorTasks])
        const quotesProviderValue: contextType<quotesType> = useMemo(() => ({
            data: quotes,
            loading: loadingQuotes,
            error: errorQuotes
        }), [quotes, loadingQuotes, errorQuotes])
        /*const quotesProviderValue: quotesContextType = {
            quotes: quotes,
            loading: loadingQuotes,
            error: errorQuotes
        }*/
        const contexts: contextsType = {
            quotesContext,
            taskContext
        };

        return (
            <taskContext.Provider value={taskProviderValue}>
                <quotesContext.Provider value={quotesProviderValue}>
                    <WrappedComponent
                    {...rest as unknown as T}
                    >
                    </WrappedComponent>
                </quotesContext.Provider>
            </taskContext.Provider>
        )
    }
}

export default withHomePage;

/*
*  * COMPLICATION
render={({
    Component,
    componentsProps,
    context
}: renderFunctionType) =>
    contextContainer<unknown>(Component, componentsProps)
    ({
        context: context,
        timeBeforeLoading: 200,
        errorTime: 2500,
        positionFixed: true
    })}
contexts={contexts}
*/