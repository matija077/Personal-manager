import {
    TodaysTasksStyles
} from './TodaysTasks.styles';


import { popupsComponentPropsType } from '../../pages/home/home.page';


type TodayTasksProps = {
    children: never[];
}

function TodaysTasks({ onClickHandler, component }: TodayTasksProps & popupsComponentPropsType) {

    return (
        <TodaysTasksStyles
            onClick={onClickHandler}
            data-id={component}
        >
            TODAYS TASKS
        </TodaysTasksStyles>
    );
}

export default TodaysTasks;