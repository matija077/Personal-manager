import styled from 'styled-components';

var HomePageSectionContainerStyles = styled.section`
    background-color: hsl(250, 48%, 85%, 0.5);
    flex: 1 0 0;
    margin: 1vh 0;
    overflow: hidden;
    padding: 5px;
    position: relative;

    @media (any-hover: hover){
        &:hover{
            box-shadow: 10px 10px 5px gray;
        }
    }

    @media (any-hover: hover) and (max-width: 400px) {
        &:hover{
            box-shadow: 5px 5px 2.5px gray;
        }
    }
`;

export {
    HomePageSectionContainerStyles
}