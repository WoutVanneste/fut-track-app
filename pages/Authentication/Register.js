import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AuthenticationStyles from '../../styles/Authentication';
import GeneralStyles from '../../styles/General';

const Register = ({ registerUser, auth, setIsRegisterUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createAccount = () => {
        if (email.length === 0) {
            Alert.alert(
                "Cannot create account",
                "Please fill in your email."
            );
            return;
        }
        if (password.length === 0) {
            Alert.alert(
                "Cannot create account",
                "Please fill in your password."
            );
            return;
        }
        if (password.length >= 6) {
            registerUser(auth, email, password);
        } else {
            Alert.alert(
                "Cannot create account",
                "Your password should be 6 characters long."
            );
            return;
        }
    }

    return  <View style={[GeneralStyles.pageContainer, AuthenticationStyles.pageWrapper]}>
        <TextInput style={AuthenticationStyles.input} value={email} placeholder="Your email" onChangeText={setEmail} />
        <TextInput style={AuthenticationStyles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => createAccount()}>
            <Text style={[AuthenticationStyles.button, AuthenticationStyles.greenButton]}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRegisterUser(false)}>
            <Text style={[AuthenticationStyles.button, AuthenticationStyles.blueButton]}>Already an account? Login here</Text>
        </TouchableOpacity>
    </View>;
}

export default Register;