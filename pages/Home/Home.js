import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [text, setText] = useState("");
    return <div>
        <input type="text" onChange={(e) => setText(e.currentTarget.value)}/>
        <button onClick={async () => {
            try {
                await AsyncStorage.setItem('home-test', text);
            } catch (e) {
                console.log('error', e);
            }
        }}>Save</button>
    </div>;
}

export default Home;