import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import RadioButtonPicker from './RadioButtonPicker';
import PickerListItem from './PickerListItem';
import CustomerSlider from './CustomerSlider';
import { settings } from '../constants';
import * as actions from 'src/actions';

function Settings(props) {
  return (
    <ScrollView style={styles.scrollView}>
      {
        settings
          .filter(item => props.drawerType !== 'pdf' || item.id === "bg")
          .map((item, i) => {
            switch (item.type) {
              case 'slider':
                return <CustomerSlider
                  key={item.id}
                  title={`${item.text}: ${props.settings[item.id]}`}
                  step={item.step}
                  value={item.convertBackward(props.settings[item.id])}
                  minimumValue={item.minValue}
                  maximumValue={item.maxValue}
                  onSlidingComplete={val => {
                    props.updateSettings({ [item.id]: item.convertFunc(val) })
                  }}
                />
              default:
                return <PickerListItem
                  key={item.id}
                  items={item.items}
                  prompt={item.title}
                  title={item.text}
                  selectedValue={props.settings[item.id]}
                  onValueChange={val => {
                    props.updateSettings({ [item.id]: val });
                  }}
                />
            }
          })}
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps, actions)(Settings);

const styles = {
  scrollView: {
    flex: 1,
  },
};
