/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import ApolloClient, { createNetworkInterface } from 'apollo-client'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from "graphql-tag"

// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
// })

const client = new ApolloClient({ uri:'http://localhost:3000/graphql'})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        <PokedexWithData/>
        </View>
      </ApolloProvider>
    );
  }
}


class Pokedex extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<Text>Loading</Text>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<Text>An unexpected error occurred</Text>)
    }

    console.log(this.props.data.user.id)
    return (
      <View>
        <Text>
          {this.props.data.user.id}
        </Text>
      </View>
    )
  }
}

const TrainerQuery = gql`
  query Query {
    user(id: "4ij7rdxxJLVtY3cvAogZB5wiy692") {
      id
    }
  }
`

const PokedexWithData = graphql(TrainerQuery)(Pokedex)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
