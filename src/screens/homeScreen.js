import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView } from "react-native";
import { connect } from 'react-redux'

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: []
    };
  }

  componentDidMount () {
    const props = this.props;
    this.setState({ 
      posts: props.posts, 
      filteredPosts: props.filteredPosts 
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.filteredPosts !== nextProps.filteredPosts) {
      this.setState({ 
        filteredPosts: nextProps.filteredPosts
      })
    }
  }
  
  onPostShow = post => {
    alert(JSON.stringify(post));
    // this.props.navigation.navigate("PostShow", { post });
  };

  render() {
    var posts = this.state.filteredPosts.map(post => {
      return (
        <View key={post.id} style={styles.itemContainer}>
          <Text style={styles.text} onPress={() => this.onPostShow(post)}>{post.title}</Text>
        </View>
      );
    });

    return (
      <ScrollView>{posts}</ScrollView>
    );
  }
}

const styles = {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)