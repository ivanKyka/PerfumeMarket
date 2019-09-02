import React from 'react';
import styled, {ThemeProvider} from 'styled-components'
import {Query} from "react-apollo";
import gql from "graphql-tag";
import CommentBlock from "./CommentBlock";
import {theme} from "../../stores/StyleStore";
import AddComentModalPane from "./AddComentModalPane";

export default class CommentsContainer extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            isCommentOpen: false
        }
        this.createComment = this.createComment.bind(this);
        this.closeCommentCreation = this.closeCommentCreation.bind(this);
    }

    createComment = e => {
        this.setState({isCommentOpen: true})
    }

    closeCommentCreation = e => {
        this.setState({isCommentOpen: false})
    }

render() {
    return(
        <ThemeProvider theme={theme}>
            <Container>
                <div>
                    <Title>Коментарии</Title>
                    <AddCommentButton onClick={this.createComment}>Добавить комментарий</AddCommentButton>
                </div>
                <Query
                    query={
                        gql`query($id: ID!){
                              product(id: $id){
                                 comments{
                                   _id
                                  text
                                  rate
                                  response
                                  verified
                                  owner{
                                    username
                                    _id
                                  }
                                }
                                comments_len
                              }
                            }`}
                    variables={{"id":this.props.ProductID}}
                >
                    {({loading, error, data, refetch}) => {
                        if (loading) return <p></p>;
                        if (error) {
                            return <p>Error :(</p>;
                            }
                        refetch = refetch.bind(this);
                        if (data.product.comments.length === 0) {
                            return (
                                <React.Fragment>
                                    <NoCommentsBlock>
                                        <h2>Коментариев пока нет :(</h2>
                                        <p>Но вы можете <AddCommentSign onClick={this.createComment}>оставить свой</AddCommentSign></p>
                                    </NoCommentsBlock>
                                    <AddComentModalPane closeWindow={this.closeCommentCreation}
                                                        ProductID={this.props.ProductID}
                                                        open={this.state.isCommentOpen}
                                                        refetch={refetch}
                                    />
                                </React.Fragment>
                            )
                        }
                        return (
                            <React.Fragment>
                            {data.product.comments.map(elem => <CommentBlock elem={elem} refetch={refetch} key={elem._id}/>)}
                            <AddComentModalPane closeWindow={this.closeCommentCreation}
                                ProductID={this.props.ProductID}
                                open={this.state.isCommentOpen}
                                refetch={refetch}
                            />
                            </React.Fragment>
                        )
                        }
                    }
                </Query>



            </Container>
        </ThemeProvider>
    )
    }
}

const Container = styled.div`
    width: 80%;
    margin: 10px auto;
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

const Title = styled.span`
    font-size: 20px;
    text-transform: uppercase;
`;

const AddCommentButton = styled.button`
    float: right;
    cursor: pointer;
    width: 300px;
    font-size: 18px;
    font-weight: bold;
    height: 32px;
    background: white;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 0px 2px rgba(255, 255, 255, 0.75);
    text-transform: uppercase;
    border: 3px solid #282828;
`;