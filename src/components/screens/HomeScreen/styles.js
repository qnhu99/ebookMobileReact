import { StyleSheet } from 'react-native';
import { COLORS } from 'src/res';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.BEIGE,
  },
  section: {
    marginTop: 5,
    backgroundColor: COLORS.LIGHT,
  },
  welcomeIntro: {
    backgroundColor: COLORS.LIGHT,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  bookItem: {
    backgroundColor: COLORS.DARK,
    marginRight: 3,
    marginBottom: 10,
    // height: 192,
    // width: 120,
  },
  coverImage: {
    // width: null,
    // height: null,
    height: 192,
    width: 120,
    resizeMode: 'contain',
  },
  fileItem: {
    backgroundColor: COLORS.LIGHT,
    flex: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
  },
});

export default styles;
