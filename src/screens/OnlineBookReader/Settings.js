import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../actions/readerSettings';
import CustomSlider from 'src/components/CustomerSlider';
import RadioButtomPicker from 'src/components/RadioButtonPicker';
import { globalSettings } from '../../constants';
import { settings } from '../../constants';

function Settings(props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <RadioButtomPicker
          title="Font"
          initial={globalSettings[0].items.findIndex(elements => elements.label === props.settings.font?.label) + 1}
          selections={globalSettings[0].items}
          selectedBtn={props.setFont}
        />
        <RadioButtomPicker
          title="Theme"
          initial={settings[0].items.findIndex(elements => elements.label === props.settings.theme?.label) + 1}
          selections={settings[0].items}
          selectedBtn={props.setTheme}
        />
        <CustomSlider
          title={`Font size: ${props.settings.fontSize}`}
          maximumValue={24}
          minimumValue={15}
          step={1}
          value={props.settings.fontSize}
          onValueChange={props.setFontSize}
        />
        <CustomSlider
          title={`Line height: ${props.settings.lineHeight}`}
          maximumValue={2.4}
          minimumValue={1.4}
          step={0.2}
          value={Math.round(props.settings.lineHeight * 10) / 10}
          onValueChange={val => {
            props.setLineHeight(Math.round(val * 10) / 10);
          }}
        />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => ({
  settings: state.readerSettings
});

export default connect(mapStateToProps, actions)(Settings);

const styles = {
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1
  }
};
