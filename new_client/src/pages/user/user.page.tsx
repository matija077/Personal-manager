import { UserStyles } from './user.styles';
import { userType } from './../../graphQL/types';

import Label from '../../components/Label/Label.component';
import HalfSizedContainer from '../../components/half-sized-container/HalfSizedContainer.component';
import InputText from '../../components/inputs/input-text/InputText.component';
import InputEmail from '../../components/inputs/input-email/InputEmail.component';
import Grid from '../../components/grid/grid.component';
import Row from '../../components/row/row.component';

type UserPropTypes = {

} & userType

function User({ nickname }: UserPropTypes) {
    return (
        <HalfSizedContainer>
            <header>
                <h2>
                    {nickname} profile
                </h2>
            </header>
            <Grid>
                <Row>
                    <Label
                        text="Nickname"
                    >
                        <InputText>

                        </InputText>
                    </Label>
                </Row>
                <Row>
                    <Label
                        text="Name"
                    >
                        <InputText>

                        </InputText>
                    </Label>
                </Row>
                <Row>
                    <Label
                        text="Surname"
                    >
                        <InputText>

                        </InputText>
                    </Label>
                </Row>
                <Row>
                    <Label
                        text="Email"
                    >
                        <InputEmail>

                        </InputEmail>
                    </Label>
                </Row>
            </Grid>
            <footer>
                <button>Apply changes</button>
            </footer>
        </HalfSizedContainer>
    )
}

export default User;