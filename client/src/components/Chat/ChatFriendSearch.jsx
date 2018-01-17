import _ from 'lodash'
import React from 'react'
import { Search } from 'semantic-ui-react'
import http from 'axios';

class ChatFriendSearch extends React.Component {
  
  constructor() {
    super();

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount() {
    this.getAllUsers();
    console.log(this.state)
  }

  getAllUsers() {
    //var user = this.state.username;
    http.get(`/api/search/users`)
      .then((response) => {
        console.log('Response back from /search ', response);
        let searchNames = response.data.map(function (user) {
          return {
            "title": user.first_name + ' ' + user.last_name,
            "description": user.username
          }
        });
        this.setState({
          source: searchNames
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  resetComponent() {
    this.setState({ 
      isLoading: false, 
      results: [], 
      value: '' 
    })
  };

  handleResultSelect(e, { result }) {
    this.setState({ 
      value: result.title 
    });

    this.props.onSelect(result.title);
  };

  handleSearchChange(e, { value }) {

    this.setState({ 
      isLoading: true, 
      value 
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
      />
    )
  }
}

export default ChatFriendSearch;