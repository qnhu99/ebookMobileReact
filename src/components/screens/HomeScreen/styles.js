import { StyleSheet } from 'react-native';
import { COLORS } from 'src/res';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
  },
  section: {
    marginTop: 7,
    backgroundColor: COLORS.LIGHT,
    elevation: 5,
  },
  welcomeIntro: {
    backgroundColor: COLORS.LIGHT,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  bookItem: {
    marginRight: 3,
    marginBottom: 10,
    backgroundColor: COLORS.DARK,
  },
  coverImage: {
    height: 192,
    width: 120,
    resizeMode: 'contain',
  },
  fileItem: {
    flex: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.DARK,
  },
});

export default styles;
