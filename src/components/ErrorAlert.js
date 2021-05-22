import { Alert } from 'react-native';

function ErrorAlert(props) {
  const errorMessage = props.errorMessage;
  return Alert.alert('Error', errorMessage);
}

export default ErrorAlert;
