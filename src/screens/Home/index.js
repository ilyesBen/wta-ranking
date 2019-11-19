import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {Row, Text} from 'native-base';
import {connect} from 'react-redux';
import {getPlayers, refreshPlayers, loadMorePlayers} from 'modules/Feed/actions';
import {
  selectPlayers,
  selectLoading,
  selectRefreshing,
  selectLoadingMore,
  selectError,
} from 'modules/Feed/selectors';
import {Loading, Error} from 'components';

import theme from 'config/theme';
import {Search, Filter, PlayerCard} from './components';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-around',
    backgroundColor: theme.surface,
    padding: 10,
  },
});

class HomeScreen extends React.Component {
  componentDidMount() {
    const {onGetPlayers} = this.props;
    onGetPlayers();
  }

  renderHeader = () => {
    const {navigation} = this.props;
    return (
      <Row style={styles.headerContainer}>
        <Search onPress={() => navigation.navigate('Search')} />
        <Filter onPress={() => navigation.navigate('Filter')} />
      </Row>
    );
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;
    const {ranking, rankingPoints, countryCode, firstName, lastName, tours, id} = item;
    return (
      <PlayerCard
        ranking={ranking}
        rankingPoints={rankingPoints}
        countryCode={countryCode}
        firstName={firstName}
        lastName={lastName}
        tours={tours}
        playerId={id}
        navigation={navigation}
      />
    );
  };

  renderEmpty = () => {
    const {error, onGetPlayers} = this.props;
    if (error) {
      return <Error errorMessage={error} onTryAgainPress={onGetPlayers} />;
    }
    return (
      <View alignItems="center" justifyContent="center">
        <Text>No Results found</Text>
      </View>
    );
  };

  renderFooter = () => {
    const {loadingMore} = this.props;
    if (loadingMore) {
      return (
        <View height={50}>
          <Loading />
        </View>
      );
    }
    return null;
  };

  refresh = () => {
    const {onRefreshPlayers} = this.props;
    onRefreshPlayers();
  };

  loadMore = () => {
    const {onLoadMorePlayers} = this.props;
    onLoadMorePlayers();
  };

  render() {
    const {players, refreshing, loading} = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <View flex={1}>
        <FlatList
          ListHeaderComponent={() => this.renderHeader()}
          stickyHeaderIndices={[0]}
          data={players}
          renderItem={this.renderItem}
          keyExtractor={player => `${player.id}}`}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.refresh} />}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetPlayers: PropTypes.func.isRequired,
  onRefreshPlayers: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  refreshing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  onLoadMorePlayers: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    players: selectPlayers(state),
    loading: selectLoading(state),
    error: selectError(state),
    refreshing: selectRefreshing(state),
    loadingMore: selectLoadingMore(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onGetPlayers: () => dispatch(getPlayers()),
  onRefreshPlayers: () => dispatch(refreshPlayers()),
  onLoadMorePlayers: () => dispatch(loadMorePlayers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
