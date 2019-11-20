import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native';
import {ListItem, Text} from 'native-base';
import {connect} from 'react-redux';
import {Error, Loading} from 'components';
import {searchPlayers} from 'modules/Search/actions';
import {selectSearchResult, selectLoading, selectError} from 'modules/Search/selectors';
import {SearchInput} from './components';

class SearchScreen extends React.Component {
  timeout = null;

  constructor() {
    super();
    this.state = {searchText: ''};
  }

  search = searchText => {
    const {onSearchPlayer} = this.props;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      onSearchPlayer(searchText);
      this.setState({searchText});
    }, 500);
  };

  renderItem = ({item}) => {
    const {firstName, lastName, id} = item;
    const {navigation} = this.props;
    return (
      <ListItem onPress={() => navigation.navigate('Player', {playerId: id})}>
        <Text>{`${firstName} ${lastName}`}</Text>
      </ListItem>
    );
  };

  renderEmpty = () => {
    const {error} = this.props;
    const {searchText} = this.state;

    if (error) {
      return <Error errorMessage={error} />;
    }

    if (searchText) {
      return (
        <View alignItems="center" justifyContent="center" marginTop={10}>
          <Text>{`No matches found for "${searchText}"`}</Text>
        </View>
      );
    }

    return null;
  };

  renderList = () => {
    const {loading, searchResult} = this.props;

    if (loading) {
      return (
        <View height={100}>
          <Loading />
        </View>
      );
    }

    return (
      <FlatList
        data={searchResult}
        renderItem={this.renderItem}
        keyExtractor={player => `${player.id}`}
        ListEmptyComponent={this.renderEmpty}
        keyboardShouldPersistTaps="always"
      />
    );
  };

  render() {
    const {navigation} = this.props;

    const {goBack} = navigation;
    return (
      <View flex={1}>
        <SearchInput onChangeText={text => this.search(text)} goBack={goBack} />
        {this.renderList()}
      </View>
    );
  }
}

SearchScreen.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchPlayer: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    searchResult: selectSearchResult(state),
    loading: selectLoading(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchPlayer: searchText => dispatch(searchPlayers(searchText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
