import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, Text} from 'native-base';
import {connect} from 'react-redux';
import {searchPlayers} from 'modules/Search/actions';
import {selectSearchResult} from 'modules/Search/selectors';

import {SearchInput} from './components';

class SearchScreen extends React.Component {
  timeout = null;

  search = searchText => {
    const {onSearchPlayer} = this.props;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => onSearchPlayer(searchText), 500);
  };

  renderItem = ({item}) => {
    const {firstName, lastName, id} = item;
    const {navigation} = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Player', {playerId: id})}>
        <ListItem>
          <Text>{`${firstName} ${lastName}`}</Text>
        </ListItem>
      </TouchableOpacity>
    );
  };

  render() {
    const {searchResult, navigation} = this.props;
    const {goBack} = navigation;
    return (
      <View flex={1}>
        <SearchInput onChangeText={text => this.search(text)} goBack={goBack} />
        <FlatList
          data={searchResult}
          renderItem={this.renderItem}
          keyExtractor={player => `${player.id}`}
        />
      </View>
    );
  }
}

SearchScreen.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchPlayer: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  return {
    searchResult: selectSearchResult(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchPlayer: searchText => dispatch(searchPlayers(searchText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
