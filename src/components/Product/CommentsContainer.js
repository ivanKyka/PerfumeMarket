import React from 'react';
import styled from 'styled-components'
import {Query} from "react-apollo";
import gql from "graphql-tag";
import CommentBlock from "./CommentBlock";


export default class CommentsContainer extends React.Component {

render() {
    return(
        <Container>
            <Query
                query={
                    gql`query($id: ID!){
                                  product(id: $id){
                                     comments{
                                      text
                                      rate
                                      response
                                      verified
                                      owner{
                                        username
                                      }
                                    }
                                    comments_len
                                  }
                                }`}
                variables={{"id":this.props.ProductID}}
            >
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                        }
                    return (
                        data.product.comments.map(elem => {
                            return(
                                <CommentBlock elem={elem}/>
                            )
                        })
                    );
                    }
                }
            </Query>
        </Container>
    )
    }
}

const Container = styled.div`
    margin: 40px;
    
`;