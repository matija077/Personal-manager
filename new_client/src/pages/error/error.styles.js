import styled from 'styled-components';

import error from '../../assets/error.png'

console.log(error)

var ErrorStyles = styled.article`

    background-image: ${error}
`;

export {
    ErrorStyles
};

//  background-image: ${({ backgroundImageUrl = null }) => backgroundImageUrl}