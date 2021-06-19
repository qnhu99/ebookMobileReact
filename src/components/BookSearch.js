import React, { useState } from 'react';
import { TextInput, Text, View, SafeAreaView, VirtualizedList, ActivityIndicator } from 'react-native';
import SearchItem from './SearchItem';
import { contrastColor } from '../constants';
import styled from 'styled-components';
import showToast from '../components/Toast';

const DisplayText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
`;
const Container = styled(View)`
  display: flex;
  align-items: center;
  flex: 1;
`;

const SearchResultWrapper = styled(SafeAreaView)`
  flex: 1;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 5px;
`;

const SearchResultList = styled(VirtualizedList)`
  flex: 1;
`;

function BookSearch(props) {
  const [input, setInput] = useState('');
  const [isShowResult, setIsShowResult] = useState(false);

  function handleOnInputChange(val) {
    setInput(val);
    setIsShowResult(false);
  }

  function renderResults() {
    if (props.isSearching) {
      return <ActivityIndicator size="large" />
    }
    if (input && isShowResult && props.searchResults && props.searchResults.length > 0) {
      return <SearchResultWrapper>
        <SearchResultList
          data={props.searchResults}
          initialNumToRender={1}
          renderItem={({ item }) => <SearchItem {...item} onPress={props.goToLocation} />}
          keyExtractor={(item, i) => i}
          getItemCount={data => data.length}
          getItem={(data, i) => data[i]}
        />
      </SearchResultWrapper>;
    }
    return <DisplayText>
      {input ? (isShowResult ? "Nothing found! 😥" : 'Submit to search 🔎') : "Input something to search 😊"}
    </DisplayText>;
  }

  return (
    <Container>
      <TextInput
        value={input}
        onChangeText={handleOnInputChange}
        placeholder="Search"
        allowFontScaling={false}
        returnKeyType="search"
        style={styles.input}
        onSubmitEditing={() => {
          if (!input) {
            showToast("Input is empty! Please input some text.");
          } else {
            setIsShowResult(true);
            props.onSearch(input);
          }
        }}
      />

      {renderResults()}
      {/* <ResultWrapper contentContainerStyle={styles.scrollViewContent}>
      </ResultWrapper> */}
    </Container>
  );
}

export default BookSearch;

const styles = {
  scrollView: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  scrollViewContent: {
    display: 'flex',
    alignItems: 'flex-start',
    alignItems: 'center',
    paddingBottom: 40,
  },
  input: {
    fontSize: 15,
    height: 36,
    width: '95%',
    color: contrastColor,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: contrastColor,
    borderRadius: 20,
    marginBottom: 10,
  },
};
