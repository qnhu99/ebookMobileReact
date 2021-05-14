import { StyleSheet } from 'react-native';
import { COLORS } from 'src/res';

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: COLORS.WHEAT,
    elevation: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  iconContainer: { flexDirection: 'row' },
});

export default styles;
