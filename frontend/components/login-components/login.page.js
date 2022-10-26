import React from 'react';
import { Image,Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {LoginButton} from './login.button'
export const LoginComponent = () => {
    return (
        <View>
            <Image
                source={require('frontend/components/login-components/vector.png')}
            />
            <TextInput/>
            <TextInput/>
            <LoginButton title={'lol'}/>
            <LoginButton title={'Teste'}/>
        </View>
    )
}