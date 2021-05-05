import {StyleSheet} from 'react-native';
import {COLORS} from 'src/res';

const styles = StyleSheet.create({
  container: {overflow: 'hidden'},
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: COLORS.WHEAT,
    elevation: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  iconContainer: {flexDirection: 'row'},
});

export default styles;
