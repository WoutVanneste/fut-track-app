import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Games = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        async function GetData() {
            try {
                const value = await AsyncStorage.getItem('home-test');
                setText(value);
            } catch (e) {
                console.log('error', e);
            }
        }
        GetData();
    }, [])
    return <p>Text: {text}</p>;
}

export default Games;