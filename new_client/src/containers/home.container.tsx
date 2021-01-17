import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { useSelector } from 'react-redux';
import { getTasks } from '../redux/task-reducer/task-reducer.selectors';

import { queries, mutations } from '../graphQL/resolvers';
import { useConsoleLogQueries, useError } from '../utility/customHooks.utils';

type withHomePagePropsType = {
    //currentProp: String
}

type withHomePageIntersectionTPropsType<T> = withHomePagePropsType & T;

function withHomePage<T>( WrappedComponent: React.ComponentType<T>) {
    return function WithHomePage(props: withHomePageIntersectionTPropsType<T>) {
        const reduxTasks = useSelector(getTasks);

        var { loading: loadingQuotes, error: errorQuotes, data: quotes } :
        {loading: boolean, error?: any, data: any} = useQuery(queries.GET_QUOTES);
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

        var {...rest} = props;

        return (
            <WrappedComponent
            {...rest as unknown as T}
            >
            </WrappedComponent>
        )
    }
}

export default withHomePage;