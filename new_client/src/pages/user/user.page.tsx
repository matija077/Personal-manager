import { UserStyles } from './user.styles';
import { userType } from './../../graphQL/types';

type UserPropTypes = {

} & userType

function User({}: UserPropTypes) {
    return (
        <HalfSizeContainer>
            <Label
                text="Nickname"
            >
                <InputText>

                </InputText>
            </Label>
            <Label
                 text="Name"
            >
                <InputText>

                </InputText>
            </Label>
            <Label
                text="Surname"
            >
                <InputText>

                </InputText>
            </Label>
            <Label
                text="Email"
            >
                <InputEmail>

                </InputEmail>
            </Label>
        </HalfSizeContainer>
    )
}

export default User;