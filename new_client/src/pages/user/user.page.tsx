import { UserStyles } from './user.styles';
import { userType } from './../../graphQL/types';
import { useSelector, shallowEqual } from 'react-redux';

import { getUser } from '../../redux/user-reducer/user.selectors';

import Label, {textAlign} from '../../components/Label/Label.component';
import HalfSizedContainer from '../../components/half-sized-container/HalfSizedContainer.component';
import InputText from '../../components/inputs/input-text/InputText.component';
import InputEmail from '../../components/inputs/input-email/InputEmail.component';
import Grid from '../../components/grid/grid.component';
import Row from '../../components/row/row.component';

type UserPropTypes = {

} & userType

function User({ nickname }: UserPropTypes) {
    const user = useSelector(getUser, shallowEqual);

    const mapOfIds: {
        [key: string]: string,
        nameInput: string,
        surnameInput: string,
        nicknameInput: string,
        emailInput: string
    } = {
        nameInput: "name",
        surnameInput: "surname",
        nicknameInput: "nickname",
        emailInput: "email"
    }

    return (
        <HalfSizedContainer>
            <header
                style={{ textAlign: "center" }}
            >
                <h2>
                    {user.nickname} profile
                </h2>
            </header>
            <Grid>
                <Row
                    percantageLeft={1}
                    percantageRight={1}
                >
                    <Label
                        text="Nickname"
                        htmlFor={mapOfIds.nicknameInput}
                        textAlign={textAlign.right}
                    >
                    </Label>
                    <InputText
                        id={mapOfIds.nicknameInput}
                    >
                    </InputText>
                </Row>
                <Row
                    percantageLeft={4}
                    percantageRight={5}
                >
                    <Label
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
                    <Label
                        text="Email"
                        htmlFor={mapOfIds.emailInput}
                        textAlign={textAlign.right}
                    >
                    </Label>
                    <InputEmail
                            
                        >

                    </InputEmail>
                </Row>
            </Grid>
            <footer
                style={{ textAlign: "center" }}
            >
                <button>Apply changes</button>
            </footer>
        </HalfSizedContainer>
    )
}

export default User;