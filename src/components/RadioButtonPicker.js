import React from 'react';
import { View, Text } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

function RadioButtomPicker(props) {
    const selections = props.items;
    const initialValue = selections.findIndex(item => item.value === props.settings[props.id]) + 1;
    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>{props.title}</Text>
            <RadioButtonRN
                initial={initialValue}
                data={selections}
                selectedBtn={e => {
                    if (e !== undefined) props.updateSettings({ [props.id]: e.value });
                }}
                box={false}
            />
        </View>
    );
}


const mapStateToProps = state => ({
    settings: state.settings,
});

export default connect(mapStateToProps, actions)(RadioButtomPicker);

const styles = {
    wrapper: { paddingBottom: 10 },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    select: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
};
