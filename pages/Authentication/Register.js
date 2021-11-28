import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import AuthenticationStyles from '../../styles/Authentication';
import GeneralStyles from '../../styles/General';

const Register = ({ registerUser, auth, setIsRegisterUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return  <View style={[GeneralStyles.pageContainer, AuthenticationStyles.pageWrapper]}>
        <TextInput style={AuthenticationStyles.input} value={email} placeholder="Your email" onChangeText={setEmail} />
        <TextInput style={AuthenticationStyles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => registerUser(auth, email, password)}>
            <Text style={[AuthenticationStyles.button, AuthenticationStyles.greenButton]}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRegisterUser(false)}>
            <Text style={[AuthenticationStyles.button, AuthenticationStyles.blueButton]}>Already an account? Login here</Text>
        </TouchableOpacity>
    </View>;
}

export default Register;