import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import DescriptionBlock from './DescriptionBlock';


export default class Description extends React.Component {


render() {
    return(
        <div style={{    padding: '20px'}}>
            <Query query={gql`query ($id: ID!){
  product(id: $id){
    descJSON
  }
}`} variables={{"id":this.props.ProductID}}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    console.log(data.product.descJSON);
                    return(
                        data.product.descJSON.map(elem => {
                            return(
                                <DescriptionBlock elem={elem} key={elem.header}/>
                            );
                        })
                    )
                }}
            </Query>
        </div>
    )
    }
}

