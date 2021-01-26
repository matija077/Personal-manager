import {
    TodaysTasksStyles
} from './TodaysTasks.styles';


import { popupsComponentPropsType } from '../../pages/home/home.page';


type TodayTasksProps = {
    children: never[];
}

function TodaysTasks({ }: TodayTasksProps) {
    return (
        <TodaysTasksStyles
        >
            TODAYS TASKS
        </TodaysTasksStyles>
    );
}

export default TodaysTasks;