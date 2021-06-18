import React from 'react';
import { View, Text } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

function RadioButtomPicker(props) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>{props.title}</Text>
            <RadioButtonRN
                data={props.selections}
                initial={props.initial}
                selectedBtn={e => {
                    if (e !== undefined) props.selectedBtn(e);
                }}
                box={false}
            />
        </View>
    );
}

export default RadioButtomPicker;

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
