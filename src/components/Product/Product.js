import React from 'react';

export default class Product extends React.Component {

render() {
    return(
    <h1>Product: {this.props.match.params.id}</h1>
    )
    }
}