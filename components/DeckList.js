import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity  } from 'react-native'
import { getDecks } from '../utils/helpers'

class DeckList extends Component {

    state = {
      decks: null
    }

    componentDidMount() {
      this.loadDecks()
    }
      
    // method to render the item inside the flat list
    _renderItem = ( { item } ) => (
      <TouchableOpacity style={styles.container} 
            onPress={() => this.props.navigation.navigate(
                      'DeckDetail',
                      { deckTitle: this.state.decks[item].title }
                    )}>
        <Text style={styles.title}>{this.state.decks[item].title}</Text>
        <Text style={styles.subtitle}>{this.state.decks[item].questions.length} cards</Text>

      </TouchableOpacity>
    )

    // method to set the key value foreach item in the flat list
    _keyExtractor = (item, index) => item

    loadDecks = () => {
        getDecks()
        .then( ( res ) => { this.setState({ decks: JSON.parse(res)}) } )
    }

    render() {
        return (
            <View >
                { this.state.decks && 
                  <FlatList
                      data={Object.keys(this.state.decks)}
                      renderItem={this._renderItem}
                      keyExtractor={this._keyExtractor}
                  />
                }
                { !this.state.decks && 
                  <View style={{ padding: 15}}>
                    <Text style={{ fontSize: 22}}>
                      Ops... still there aren't decks! Please insert one!
                    </Text>
                  </View>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: "700"
  },
  subtitle: {
    color: "#BDBDBD"
  }
})

export default DeckList