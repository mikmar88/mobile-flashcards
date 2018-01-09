import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Platform, Animated, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getDeck } from '../utils/helpers'
import { grey400, white, bluegrey400, bluegrey700 } from '../utils/colors'
import MyButton from './MyButton'

class DeckDetail extends Component {
    state =  {
        deck: null,
        fadeAnim: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000
            }
        )
        .start()

        this.loadDeckDetail(this.props.navigation.state.params.deckTitle)
    }

    static navigationOptions = ({ navigation }) => {

        return { 
            title: navigation.state.params.deckTitle,
            headerLeft: 
            <TouchableOpacity>
                <Ionicons name={Platform.OS === 'ios'? 'ios-arrow-round-back' : 'md-arrow-back' } 
                    size={24}
                    style={{margin: 20 }}
                    onPress={() => {
                            navigation.navigate('DeckList')
                        }
                    }
                />
            </TouchableOpacity>
        }
    }
    
    loadDeckDetail = (title) => {
        getDeck(title)
        .then((deck) =>  this.setState({ deck }) )
    }

    gotoNewQuestion = () => this.props.navigation.navigate('NewQuestion', { title: this.state.deck.title, loadDeckDetail: this.loadDeckDetail })

    gotoNewQuiz = () => this.props.navigation.navigate('QuizDetail', { deck: this.state.deck} )
    
    render() {
        const deck = this.state.deck

        let { fadeAnim } = this.state


        return (
            <Animated.View style={[ styles.container, {...this.props.style, opacity: fadeAnim} ] }>
                { deck && 
                    <View>
                        <Text style={styles.deckTitle}>{deck.title}</Text>
                        <Text style={styles.deckSubtitle} >{deck.questions.length} cards</Text>
                        <MyButton onPress={this.gotoNewQuestion} text="Create new question" style={{ backgroundColor: bluegrey400}}/>
                        { deck.questions.length > 0 && 
                            <MyButton onPress={this.gotoNewQuiz} text="Start quiz" style={{ backgroundColor: bluegrey700}}/>
                        }
                    </View>
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'stretch',
        flex: 1
    },
    deckTitle: {
        fontSize: 28,
        textAlign: 'center'
    },
    deckSubtitle: {
        fontSize: 22,
        color: grey400,
        textAlign: 'center'
    }
})

export default DeckDetail