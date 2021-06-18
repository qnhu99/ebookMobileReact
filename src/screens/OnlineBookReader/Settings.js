import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../actions/readerSettings';
import CustomSlider from 'src/components/CustomerSlider';
import { globalSettings } from '../../constants';
import { settings } from '../../constants';
import PickerListItem from 'src/components/PickerListItem';

function Settings(props) {
  return (
    <ScrollView style={styles.wrapper}>
      <PickerListItem
        items={globalSettings[0].items}
        prompt="Choose Font"
        title="Font"
        selectedValue={props.settings.font}
        onValueChange={props.setFont}
        getPickerItemLabel={item => item.label}
        getPickerItemValue={item => item}
      />
      <PickerListItem
        items={settings[0].items}
        prompt="Choose theme"
        title="Theme"
        selectedValue={props.settings.theme}
        onValueChange={props.setTheme}
        getPickerItemLabel={item => item.label}
        getPickerItemValue={item => item}
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
  );
}

const mapStateToProps = state => ({
  settings: state.readerSettings
});

export default connect(mapStateToProps, actions)(Settings);

const styles = {
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
  }
};
