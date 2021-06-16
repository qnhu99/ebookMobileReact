import React from 'react';
import { View, ScrollView } from 'react-native';
import FontChange from './FontChange';
import Theme from './Theme';
import FontSize from './FontSize';
import LineHeight from './LineHeight';
import { connect } from 'react-redux';
import * as actions from '../../actions/readerSettings';

function Settings(props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <FontChange
          initial={props.settings.font}
          handleChange={props.setFont}
        />
        <Theme initial={props.settings.theme} handleChange={props.setTheme} />
        <FontSize
          initial={props.settings.fontSize}
          handleChange={props.setFontSize}
        />
        <LineHeight
          initial={props.settings.lineHeight}
          handleChange={props.setLineHeight}
        />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return { settings: state.readerSettings };
};

export default connect(
  mapStateToProps,
  actions,
)(Settings);

const styles = {
  wrapper: { paddingHorizontal: 10, paddingVertical: 10 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
