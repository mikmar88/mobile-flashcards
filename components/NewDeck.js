import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { saveDeckTitle } from '../utils/helpers'
import MyButton from './MyButton';
import { bluegrey700, red } from '../utils/colors';

class NewDeck extends Component  {

    state = {
        title: null,
        error: null
    }

    addDeck = () => {

        if ( this.state.title && this.state.title.length > 0 ) {
            saveDeckTitle(this.state.title)
            .then( (error) => {
                if (error) {
                    this.setState({error, title: null})
                }
                else {
                    
                    this.props.navigation.navigate('DeckDetail', { deckTitle: this.state.title})
                    this.setState({ title: null, error: null})
                }
            })
        } else {
            this.setState({ error: 'Please insert the deck title'})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Deck title</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(title) => this.setState({title}) }
                    value={this.state.title}
                    placeholder="Enter the deck's title"
                />
                { this.state.error && 
                    <Text style={styles.error}>{this.state.error}</Text> 
                }
                <MyButton text="Add deck" onPress={this.addDeck} style={{ backgroundColor: bluegrey700 }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    error: {
        color: red
    }
})

export default NewDeck