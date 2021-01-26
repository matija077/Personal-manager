import {
    TodaysTasksStyles
} from './TodaysTasks.styles';


import { popupsComponentPropsType } from '../../pages/home/home.page';

import { useTaskContext } from '../../containers/home.container';

import { contextType, tasksType } from '../../graphQL/types';


type TodayTasksProps = {
    children: never[];
}

const INITAL_TASK = {
    name : "",
    category: "",
    description: undefined,
    location: undefined
}

function TodaysTasks(props: TodayTasksProps) {
    var tasks: tasksType = [];
    var tasksObject: contextType<tasksType> = useTaskContext();

    if (tasksObject?.data !== undefined) {
        tasks = tasksObject?.data.tasks
    } else if (!tasksObject?.loading) {
        console.error("no data to show");
    }

    return (
        <TodaysTasksStyles
        >
            {
                tasks.map((task, index) => <div key={index}>{task.name}</div>)
            }
        </TodaysTasksStyles>
    );
}

export default TodaysTasks;