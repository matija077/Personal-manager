import {
    TodaysTasksStyles
} from './TodaysTasks.styles';


import { popupsComponentPropsType } from '../../pages/home/home.page';

import { useTaskContext } from '../../containers/home.container';


type TodayTasksProps = {
    children: never[];
}

function TodaysTasks({ }: TodayTasksProps) {
    var tasks = useTaskContext();
    console.log(tasks);

    return (
        <TodaysTasksStyles
        >
            TODAYS TASKS
        </TodaysTasksStyles>
    );
}

export default TodaysTasks;