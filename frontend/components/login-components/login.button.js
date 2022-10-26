import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export function LoginButton(props) {
    const { onPress, title } = props;
    return(
        <Pressable style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: '10px',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#9760DC',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
})

export default LoginButton;