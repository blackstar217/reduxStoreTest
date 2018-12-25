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

import { getPosts } from '../actions/post'

const AUTH_TOKEN = "auth_token";

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiCalling: false,
      posts: [],
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
        apiCalling: false,
        posts: nextProps.posts
      })
    }
  }

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(post => {
      const postData = `${post.title.toLowerCase()} ${post.body.toLowerCase()}`;
      const textData = text.toLowerCase();
      return postData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
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
  render() {
    if (this.state.apiCalling) {
      return (
        <View
          style={{ flex: 1, alignposts: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderpost={({ post }) => (
            <View
              title={`${post.title} ${post.body}`}
              thumb={{ uri: post.images.thumb }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={post => post.id}
          postSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
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
  }
};

const mapStateToProps = state => ({
    posts: state.posts
  })
  
  const mapDispatchToProps = dispatch => ({
    getPosts: auth_token => dispatch(getPosts(auth_token))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
