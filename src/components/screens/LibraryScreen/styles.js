import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS } from 'src/res';

const numCols = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.LIGHT,
  },
  toolbar: {
    backgroundColor: COLORS.toolbar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 5,
    height: 300,
    width: DIMENSIONS.FULL_WIDTH / numCols - 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cover: {
    height: 270,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: COLORS.DARK,
  },
  title: {
    fontSize: 16,
  },
});

export default styles;
