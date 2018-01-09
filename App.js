import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TabBarIOS } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import NewQuestion from './components/NewQuestion'
import QuizDetail from './components/QuizDetail'
import { Constants } from 'expo'
import { setDecks, setLocalNotification, triggerNotification } from './utils/helpers'
import { bluegrey900, bluegrey50, bluegrey500 } from './utils/colors';

function FlashcardsStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      style: {
        height: 56,
        backgroundColor: bluegrey500
      }
    }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
  NewQuestion: {
    screen: NewQuestion
  },
  QuizDetail: {
    screen: QuizDetail
  }
})


export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlashcardsStatusBar backgroundColor={bluegrey900}/>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bluegrey50
  },
});
