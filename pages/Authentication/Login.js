import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import AuthenticationStyles from '../../styles/Authentication';
import GeneralStyles from '../../styles/General';
import Register from './Register';

const Login = ({loginUser, registerUser, auth}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegisterUser, setIsRegisterUser] = useState(false);

    if (!isRegisterUser) {
        return (
            <View style={[GeneralStyles.pageContainer, AuthenticationStyles.pageWrapper]}>
                <TextInput style={AuthenticationStyles.input} value={email} placeholder="Your email" onChangeText={setEmail} />
                <TextInput style={AuthenticationStyles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
                <TouchableOpacity onPress={() => loginUser(auth, email, password)}>
                    <Text style={[AuthenticationStyles.button, AuthenticationStyles.greenButton]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsRegisterUser(true)}>
                    <Text style={[AuthenticationStyles.button, AuthenticationStyles.blueButton]}>No account yet? Register here</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <Register registerUser={registerUser} auth={auth} setIsRegisterUser={setIsRegisterUser} />
        );
    }
}

export default Login;