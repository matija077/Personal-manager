import { HomePageSectionContainerStyles } from './homePageSectionStyles';

import { popupsComponentPropsType } from '../../pages/home/home.page';

type HomePageSectionPropsType = {
    children: any
}

function HomePageSection({children, onClickHandler, component}:  popupsComponentPropsType) {

    return (
        <HomePageSectionContainerStyles
            onClick={onClickHandler}
            data-id={component}
        >
            {children}
        </HomePageSectionContainerStyles>
    );
}

export default HomePageSection;