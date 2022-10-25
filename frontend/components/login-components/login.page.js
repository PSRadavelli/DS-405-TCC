import React from 'react';
import { Image,Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {LoginButton} from './login.button';

const staticImage = require('../../assets/Vector.png')
export const LoginComponent = () => {
    return (
        <View>
            {/* <Image source={staticImage} /> */}
            <LoginButton title={'lol'}/>
            <TextInput/>
            <TextInput/>
        </View>
    )
}