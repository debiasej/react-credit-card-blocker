import React, { Component } from 'react';
import Request from 'react-http-request';

class HTTPRequest extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Request
        url={this.props.url}
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else {
              debugger;
              this.props.data(result);
              return <div><pre>{JSON.stringify(result, null, 2) }</pre></div>;;
            }
          }
        }
      </Request>
    );
  }
}

export default HTTPRequest;
