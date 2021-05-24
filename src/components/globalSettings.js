import React from 'react';
import { ScrollView } from 'react-native';
import PickerListItem from './PickerListItem';
import { globalSettings as settings } from '../constants';

function GlobalSettings() {
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
        >
            {settings.map((item, i) => (
                <PickerListItem {...item} key={i} />
            ))}
        </ScrollView>
    );
}

export default GlobalSettings;

const styles = {
    scrollView: { flex: 1 },
    scrollViewContent: {
        alignItems: 'flex-start',
        paddingBottom: 50,
    },
};
