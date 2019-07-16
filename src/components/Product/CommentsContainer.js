import React from 'react';
import styled, {ThemeProvider} from 'styled-components'
import {Query} from "react-apollo";
import gql from "graphql-tag";
import CommentBlock from "./CommentBlock";
import {theme} from "../../stores/StyleStore";

export default class CommentsContainer extends React.Component {

render() {
    return(
        <ThemeProvider theme={theme}>
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
                        if (data.product.comments.length === 0) {
                            return (
                                <NoCommentsBlock>
                                    <h2>Коментариев пока нет :(</h2>
                                    <p>Но вы можете <AddCommentSign>оставить свой</AddCommentSign></p>
                                </NoCommentsBlock>)
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
        </ThemeProvider>
    )
    }
}

const Container = styled.div`
    margin: 40px;
`;

const NoCommentsBlock = styled.div`
    margin: 0 auto;
    width: 600px;
    height: 250px;
    text-align: center; 
    padding-top: 40px;
    
    h2{
      font-size: 24pt;
    }
    p{
      font-size: 18pt;
    }
`;

const AddCommentSign = styled.span`
    
    cursor: pointer;
    font-size: 18pt;
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.primary}
    }  
    
`;