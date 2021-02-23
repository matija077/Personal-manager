import { useState } from 'react';

import { UserStyles } from './user.styles';
import { userType } from './../../graphQL/types';
import { useSelector, shallowEqual } from 'react-redux';

import { getUser } from '../../redux/user-reducer/user.selectors';

import Label, {textAlign} from '../../components/Label/Label.component';
import HalfSizedContainer from '../../components/half-sized-container/HalfSizedContainer.component';
import InputText from '../../components/inputs/input-text/InputText.component';
import InputEmail from '../../components/inputs/input-email/InputEmail.component';
import Input from '../../components/inputs/input.component';
import Grid from '../../components/grid/grid.component';
import Row from '../../components/row/row.component';

import { useConsoleLogQueries } from '../../utility/customHooks.utils';

type UserPropTypes = {

} & userType

type InputType = {
    value: string
}

const InputTypeInitial = {
    value: ""
}

const map: {
    [key: string]: Object,
    ofIds: {
        nameInput: string,
        surnameInput: string,
        nicknameInput: string,
        emailInput: string
    },
    ofLabelText: {
        nickname: {
            nickname: string,
            nonZeroLength: boolean
        }
        email: {
            email: string,
            nonZeroLength: boolean
        }
    }
} = {
    ofIds: {
        nameInput: "Name",
        surnameInput: "Surname",
        nicknameInput: "Nickname",
        emailInput: "Email"
    },
    ofLabelText: {
        nickname: {
            nickname: "Nickname",
            nonZeroLength: false
        },
        email: {
            email: "Email",
            nonZeroLength: false
        }
    }
}

function User({ nickname }: UserPropTypes) {
    const user = useSelector(getUser, shallowEqual);
    const [nicknameInput, setNicknameInput] = useState<InputType>(InputTypeInitial);
    const [emailInput, setEmailInput] = useState<InputType>(InputTypeInitial);
    const [labelTexts, setLabelTexts] = useState<typeof map.ofLabelText>(map.ofLabelText)

    useConsoleLogQueries(false, undefined, nicknameInput, "nickname");
    useConsoleLogQueries(false, undefined, emailInput, "email");


    function onFocused(event: any) {

    }

    function onPointerLeaveHandler(event: any) {
        const value = event.currentTarget.value;
        console.dir(event.currentTarget);
        if (value === "") {
            return;
        }
        switch(event.currentTarget.type) {
            case map.ofIds.emailInput:
                setEmailInput(updateInputState);
                break;
            case map.ofIds.nicknameInput:
                setNicknameInput(updateInputState);
                break;
        }

        function updateInputState(state: InputType) {
            return {
                ...state,
                value
            }
        }
    }

    function onInputHandler(event: any) {
        const value = event.currentTarget.value;

        /*if (value.length > 0 && ) {
            return;
        }*/



    }

    return (
        <UserStyles>
        <HalfSizedContainer>
            <header
                style={{ textAlign: "center" }}
            >
                <h2>
                    {user.nickname} profile
                </h2>
            </header>
            <Grid>
                <Input
                    id={map.ofIds.nicknameInput}
                    type={'text'}
                    onFocused={onFocused}
                    onPointerLeave={onPointerLeaveHandler}
                    onInputHandler={onInputHandler}
                >
                </Input>
                <Label
                    text={labelTexts.nickname.nickname}
                    htmlFor={map.ofIds.nicknameInput}
                >
                </Label>
                <Input
                    id={map.ofIds.emailInput}
                    type={'email'}
                    onFocused={onFocused}
                    onPointerLeave={onPointerLeaveHandler}
                    onInputHandler={onInputHandler}
                >

                </Input>
                <Label
                    text={labelTexts.email.email}
                    htmlFor={map.ofIds.emailInput}
                >
                </Label>
            </Grid>
            <footer
                style={{ textAlign: "center" }}
            >
                <button>Apply changes</button>
            </footer>
        </HalfSizedContainer>
        </UserStyles>
    )
}

export default User;

/*<Label
                        text="Name"
                        htmlFor={mapOfIds.nameInput}
                        textAlign={textAlign.right}
                    >
                    </Label>
                    <InputText
                            id={mapOfIds.nameInput}
                        >

                    </InputText>
                </Row>
                <Row
                    percantageLeft={4}
                    percantageRight={5}
                >
                    <Label
                        text="Surname"
                        htmlFor={mapOfIds.surnameInput}
                        textAlign={textAlign.right}
                    >
                    </Label>
                    <InputText
                            id={mapOfIds.surnameInput}
                        >

                    </InputText>
                </Row>
                <Row
                    percantageLeft={4}
                    percantageRight={5}
                >

                </Row>*/