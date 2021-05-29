import React from 'react';
import { ScrollView, Slider } from 'react-native';
import PickerListItem from './PickerListItem';
import CustomerSlider from './CustomerSlider';
import { settings } from '../constants';

function Settings(props) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {settings.filter(item => { return props.drawerType === 'pdf' ? item.id === "bg" : true }).map((item, i) => {
        return item.type === 'slider' ?
          <CustomerSlider {...item} key={i} /> : <PickerListItem {...item} key={i} />
      })}
    </ScrollView>
  );
}

export default Settings;

const styles = {
  scrollView: { flex: 1 },
  scrollViewContent: {
    alignItems: 'flex-start',
    paddingBottom: 50,
  },
};
