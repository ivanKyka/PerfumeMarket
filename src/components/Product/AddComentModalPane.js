import React from 'react';
import Modal from 'react-responsive-modal'
import styled, {ThemeProvider} from 'styled-components'
import {theme} from "../../stores/StyleStore";
import StarRatings from 'react-star-ratings';
import {addComment} from "../../api/Comments";

export default class AddComentModalPane extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rating: 0
        }
        this.changeRating = this.changeRating.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.textRef = React.createRef();
    }

    changeRating = rating => {
        this.setState({rating: rating})
    }

    sendComment = e => {
        e.stopPropagation();
        addComment(this.textRef.current.value, this.state.rating, this.props.ProductID)
            .then(response => {
                if (response) {
                    this.props.closeWindow();
                    this.props.refetch();
                }
            })
    }

render() {
    return(
        <Modal
            open={this.props.open}
            onClose={this.props.closeWindow}
        >
                <Container>
                    <Title>Добавить коментарий</Title>
                    <Textarea ref={this.textRef} spellcheck={'false'}></Textarea>
                    <div>
                        Оценка &nbsp;&nbsp;
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor={"black"}
                            starEmptyColor={'gray'}
                            numberOfStars={5}
                            name='rating'
                            starDimension={'16px'}
                            starSpacing={'1px'}
                            changeRating={this.changeRating}
                            starHoverColor={theme.primary_light}
                        />
                    </div>
                    <Button onClick={this.sendComment}>Добавить коментарий</Button>
                </Container>
        </Modal>
    )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 40px 150px 30px 40px;  
    grid-gap: 10px;
    width: 300px;
`;

const Title = styled.h4`
    text-align: center;
    
`;

const Textarea = styled.textarea`
    resize: none;
    padding: 3px;
    font-size: 11pt;
    &:focus {
      border: none;
      box-shadow: 0 0 1px 1px ${theme.primary};
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 3px;
    background: ${theme.primary};
    color: white;
    font-size: 15pt; 
    cursor: pointer;
    
    &:hover {
        background: ${theme.primary_light};
        box-shadow: 1px 1px 1px 1px #8f8f8f;
    }   
`;