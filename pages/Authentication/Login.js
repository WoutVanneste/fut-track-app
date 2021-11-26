import React from 'react';
import { View, TextInput, Button } from 'react-native';

const Login = ({loginUser, auth}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    return (
        <View>
            <TextInput style={{marginTop: 10}} value={email} placeholder="Your email" onChangeText={setEmail} />
            <TextInput style={{marginTop: 10}} secureTextEntry={true} value={password} onChangeText={setPassword} />
            <Button title="Login" onPress={() => loginUser(auth, email, password)}/>
        </View>
    );
}

export default Login;