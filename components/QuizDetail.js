import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green , red, white, bluegrey400, bluegrey700 } from '../utils/colors'
import { saveCompletedQuiz, clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import MyButton from './MyButton'

class QuizDetail extends Component {

    state = {
        currentQuestionIndex: 0,
        view: 'question',
        correctAnswer: 0
    }

    static navigationOptions = ({ navigation }) => {
        return { title: 'Quiz' }
    }

    changeView = () => {
        this.setState({ view: this.state.view === 'question' ? 'answer' : 'question' })
    }

    answerAction = (answer) => {

        const { deck } = this.props.navigation.state.params

        // update the state
        this.setState({
            view: 'question',
            currentQuestionIndex: this.state.currentQuestionIndex + 1 ,
            correctAnswer: answer === 'correct' ? this.state.correctAnswer + 1 : this.state.correctAnswer
        })

        // if it's the last card i must save the quiz as completed 
        if ( this.state.currentQuestionIndex === deck.questions.length -1 ) {
            saveCompletedQuiz(new Date().toLocaleDateString())
            .then(
                clearLocalNotifications()
                .then(setLocalNotification)
            )
        }
        
    }

    resetQuiz = () => {
        this.setState({
            currentQuestionIndex: 0,
            view: 'question',
            correctAnswer: 0
        })
    }

    backToDeck = () => {
        const { deck } = this.props.navigation.state.params

        this.props.navigation.goBack()
    }

    render() {
        const { deck } = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                {   this.state.currentQuestionIndex === deck.questions.length && 
                    <View>
                        <Text style={styles.textView}>Your score: {`${this.state.correctAnswer}/${deck.questions.length}`}</Text>
                        <MyButton onPress={this.resetQuiz} text="Restart quiz" style={{ backgroundColor: bluegrey400 }} />
                        <MyButton onPress={this.backToDeck} text="Back to deck" style={{ backgroundColor: bluegrey700 }} />
                    </View>
                }
                { this.state.currentQuestionIndex < deck.questions.length && 
                    <View >
                        <Text style={styles.infoText}>Completed {this.state.currentQuestionIndex+1} on {deck.questions.length} questions</Text>
                        <Text style={ styles.textView}>
                        { this.state.view === 'question' ? deck.questions[this.state.currentQuestionIndex].question : deck.questions[this.state.currentQuestionIndex].answer }
                        </Text>
                        <TouchableOpacity onPress={this.changeView} style={styles.changeViewButton}>
                            <Text style={{color: red}}>
                                Show { this.state.view === 'question' ? 'answer' : 'question' }
                            </Text>
                        </TouchableOpacity>
                        <MyButton onPress={() => this.answerAction('correct') } text="Correct" style={{ backgroundColor: green}} />
                        <MyButton onPress={() => this.answerAction('incorrect') } text="Incorrect" style={{ backgroundColor: red}} />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    answerButton: {
        padding: 15,
        marginBottom: 5,
        alignItems: 'center'
    },
    changeViewButton: {
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 16
    },
    textView: {
        fontSize: 22
    }
})

export default QuizDetail