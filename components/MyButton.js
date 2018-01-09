import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { white, bluegrey400 } from '../utils/colors';

class MyButton extends Component {

    render() {
        const { style , text, onPress } = this.props

        return (    
            <TouchableOpacity onPress={onPress} style={[styles.button, style ]} >
                <Text style={styles.text}>
                    { text ? text : 'Button' }
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: bluegrey400
    },
    text: {
        color: white
    }
})

export default MyButton