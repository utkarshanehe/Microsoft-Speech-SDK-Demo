import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
} from 'react-native';
import Speech from 'react-native-microsoft-speech';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };

    //Speech.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Speech.onSpeechStart = this.onSpeechStart.bind(this);
    Speech.onSpeechEnd = this.onSpeechRecognized.bind(this);
    Speech.onSpeechResults = this.onSpeechResults.bind(this);
    console.log("Method binding done");

    // Voice.onSpeechStart = this.onSpeechStart.bind(this);
    // Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    // Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

componentWillUnmount() {
    // Speech.destroy().then(Speech.removeAllListeners);
    Speech.destroy().then(Speech.removeAllListeners).catch(e => console.log("Error while component unmounting", e));
    console.log("Componenet unmounted");
  }
  
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
    console.log("onSpeechStart(e) event = ", e);
    console.log("Started giving speech input (onSpeechStart()) \n");
  };

onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
    // this.onSpeechResults(e);
    console.log("onSpeechRecognized(e) event = ", e);
    console.log("Done with speech recognition (onSpeechRecognized()) \n");
  };

onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
    console.log("onSpeechResults(e) event = ", e);
    console.log("Results(from onSpeechResults() ) = ", e.value);
  }

_startRecognition(e) {
  console.log("------------------------------------Reached in _startRecognition");
  this.setState({
      recognized: '',
      started: '',
      results: [],
    }); 
    Speech.start('en-US');
    console.log("Started lets see");
    //console.log("_startRecognition(e) event = ", e);

//     try {
//       console.log("Starting\n");
//       await Speech.start('en-IN');
//       console.log("Started\n");
//     } catch (e) {
//       console.error(e);
//     }
  }
  
render () {
  console.log("Render method invoked");
  console.log("Results(in render method) = ", this.state.results);
  console.log("Speech.isAvailable() ", Speech.isAvailable());
  console.log("Speech.isRecognizing() ", Speech.isRecognizing());
  return (
      <View>
        <Text style={styles.transcript}>
            Transcript
        </Text>
        {this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>)}
        <Button style={styles.transcript}
        onPress={this._startRecognition.bind(this)}
        title="Start"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
});
AppRegistry.registerComponent('App', () => App);