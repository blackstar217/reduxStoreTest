import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'

import { getPosts, setFilteredPosts } from '../actions/post'

const AUTH_TOKEN = "auth_token";

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: [],
      filterText: '',
      error: null
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.getPosts(AUTH_TOKEN);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        loading: false,
        posts: nextProps.posts
      })
    }
    if (this.props.filteredPosts !== nextProps.filteredPosts) {
      console.log(nextProps.filteredPosts)
      this.setState({
        loading: false,
        filteredPosts: nextProps.filteredPosts
      })
    }
  }

  searchFilterFunction = text => {
    this.setState({ loading: true, filterText: text });
    const filteredPosts = this.state.posts.filter(post => {
      const postData = `${post.title.toLowerCase()} ${post.body.toLowerCase()}`;
      const textData = text.toLowerCase();
      return postData.indexOf(textData) > -1;
    });
    console.log(filteredPosts)
    this.props.setFilteredPosts(filteredPosts);
  };

  renderHeader = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.inputContainer}
          placeholder="Search"
          onChangeText={text => this.searchFilterFunction(text)}
        />

        <TouchableOpacity onPress={this.props.onSearch}>
          <Text>Search</Text>
        </TouchableOpacity>
        {this.props.renderResults
          ? this.props.renderResults(this.state.q)
          : this.props.children}
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.title} {item.body}</Text>
      </View>
    )
  }

  _renderItemSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: '#333' }}/>
  )
  
  render() {
    const data = this.state.filterText === '' 
      ? this.state.posts
      : this.state.filteredPosts
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignposts: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <FlatList
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this._renderItemSeparator}
      />
    );
  }
}

const styles = {
  searchContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 13,
    paddingTop: 13,
    flexDirection: "row",
    overflow: "hidden"
  },
  input: {
    marginLeft: 6
  },
  inputContainer: {
    borderBottomWidth: 0,
    width: "80%",
    backgroundColor: "#dcdce1",
    borderRadius: 9,
    height: 36,
    marginLeft: 15,
    marginRight: 15
  },
  rightIconContainerStyle: {
    marginRight: 8
  },
  leftIconContainerStyle: {
    marginLeft: 8
  },
  itemContainer: {
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center'
  },
  text: {
    marginHorizontal: 15,
  }
};

const mapStateToProps = state => ({
  posts: state.posts,
  filteredPosts: state.filteredPosts
})

const mapDispatchToProps = dispatch => ({
  getPosts: auth_token => dispatch(getPosts(auth_token)),
  setFilteredPosts: posts => dispatch(setFilteredPosts(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)