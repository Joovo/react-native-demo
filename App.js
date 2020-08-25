/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import ToastExample from './ToastExample';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('testEvent', (msg) => {
      this.setState({ result: msg });
      console.log(msg);
      ToastExample.show(msg,3000);
    });
  }

  onPressButton() {
    ToastExample.show('JavaScript call Toast Test', ToastExample.SHORT);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          ToastExample.testCallback((msg) => {
            this.setState({ result: msg });
            console.log(msg);
            ToastExample.show(msg,3000);
          });
        }}>
          <Text style={styles.welcome}>
            Callback
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          async () => {
            try {
              var {
                msg
              } = await ToastExample.testPromise();
              this.setState({ result: msg });
              console.log(msg);
              ToastExample.show(msg,3000);
            } catch (err) {
              console.log(err);
            }
          }
        }}>
          <Text style={styles.welcome}>
            Promise
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          ToastExample.testEvent();
        }}>
          <Text style={styles.welcome}>
            Event
        </Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
      </View>
    );
  }
}

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
