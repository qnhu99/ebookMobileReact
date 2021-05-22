import React from 'react';

import { View, Text } from 'react-native';

import Colors from 'src/res/icons';
// Welcome Intro
function WelcomeIntro() {
  return (
    <View style={styles.intro}>
      <Text style={{ fontSize: 24, paddingVertical: 5 }}>
        {'Welcome to App name'}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          {'Save your favorite stories\nand find more from the internet'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {/* <Button
          icon={Icons.sign_up}
          title="Sign up"
          buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
        />
        <Button
          icon={Icons.sign_in}
          title="Sign in"
          buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
        /> */}
      </View>
    </View>
  );
}

export default WelcomeIntro;

const styles = {
  intro: {
    backgroundColor: Colors.light,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 5,
    // marginTop: 180,
  },
};
