import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { addCardToDeck, getDecks } from '../utils/helpers'
import { bluegrey700, red } from '../utils/colors'
import MyButton from './MyButton'

class NewQuestion extends Component {

    state = {
        question: null,
        answer: null,
        error: null
    }

    static navigationOptions = ({ navigation }) => {
        return { title: 'Create new question' }
    }

    addQuestion = () => {
        const { question, answer } = this.state
        const card = {
            question,
            answer
        }

       const { title, loadDeckDetail } = this.props.navigation.state.params

       if ( question && question.length > 0 && answer && answer.length > 0 ) {
            addCardToDeck(title, card)
            .then(() => loadDeckDetail(title))
            .then( this.props.navigation.goBack())
       } else {
        this.setState({ error: 'You have to insert the question and the answer correctly!!'})
       }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Question</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    placeholder='Enter the question here'
                />

                <Text>Answer</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    placeholder='Enter the answer here'
                />
                { this.state.error && 
                    <Text style={styles.error}>
                        {this.state.error}
                    </Text>
                }
                <MyButton onPress={this.addQuestion}  text="Add question" style={{ backgroundColor: bluegrey700 }} />
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

export default NewQuestion