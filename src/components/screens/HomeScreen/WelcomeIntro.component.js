import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { STRINGS, ICONS } from 'src/res';

import styles from './styles.js';
export default function WelcomeIntro() {
  return (
    <View style={styles.welcomeIntro}>
      <Text style={{ fontSize: 24, paddingVertical: 5 }}>
        {STRINGS.WELCOME_TO_APP_NAME}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>{STRINGS.HOME_SCREEN_INTRO}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <SignUpButton />
        <SignInButton />
      </View>
    </View>
  );
}

const SignUpButton = () => (
  <Button
    icon={ICONS.SIGN_UP}
    title="Sign in"
    buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
  />
);

const SignInButton = () => (
  <Button
    icon={ICONS.SIGN_IN}
    title="Sign in"
    buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
  />
);
