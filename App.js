import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Form from './hooks/Form'

export default function App() {
  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
