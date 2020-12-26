import {
    TodaysTasksStyles
} from './TodaysTasks.styles';

type TodayTasksProps = {
    children: never[];
}

function TodaysTasks(props: TodayTasksProps) {

    return (
        <TodaysTasksStyles>
            TODAYS TASKS
        </TodaysTasksStyles>
    );
}

export default TodaysTasks;