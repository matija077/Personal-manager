import styled, { css}  from 'styled-components';

type SpinnerStylesContainerPropsType = {
    positionFixed: boolean
}

var SpinnerStylesContainer = styled.article.attrs<SpinnerStylesContainerPropsType>
(props => ({

}))<SpinnerStylesContainerPropsType>`
    position: fixed;
    top: 20%;
    bottom: 20%;
    width: 100%;
    height: 60vh;
    ${({ positionFixed }) => {
        console.log(positionFixed);
        if (!positionFixed) {
            return `
                position: absolute;
                left: 25%;
                bottom: 25%;
                top: unset;
                width: 50%;
                height: 50%;
            `;
        }
    }}
`;

var SpinnerStyles = styled.figure`
    position: relative;
    margin: auto;
    width: 2.28571429rem;
    height: 2.28571429rem;
    padding: 0;
    animation: spin 0.6s linear infinite;
    border: 0.2em solid rgba(0, 0, 0, 0.1);
    border-top: 0.2em solid #767676;
    border-radius: 50%;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export {
    SpinnerStyles,
    SpinnerStylesContainer
};