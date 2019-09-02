import React from 'react';
import styled from 'styled-components';
import StarRatings from "react-star-ratings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {deleteComment} from "../../api/Comments";
import {inject} from "mobx-react";

@inject('store')
export default class CommentBlock extends React.Component {

    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler = () => {
        deleteComment(this.props.elem._id);
        this.props.refetch();
    }

render() {
    let user = this.props.store.userStore.getUser();
    return(
        <Container>
            <Comment>
                <Username>{this.props.elem.owner.username}</Username>
                <StarRatings
                    rating={this.props.elem.rate}
                    starRatedColor={"black"}
                    starEmptyColor={'gray'}
                    numberOfStars={5}
                    name='rating'
                    starDimension={'16px'}
                    starSpacing={'1px'}
                />
                <Verified>{this.props.elem.verified?'Verified':''}</Verified>
                {this.props.elem.owner._id === user._id?<DeleteComment
                    icon={faTimes}
                    size={'lg'}
                    key={this.props.elem._id}
                    onClick={this.clickHandler}/>:''}
                <p>{this.props.elem.text}</p>
            </Comment>
            {this.props.elem.response ===''?'':
                <Response>
                    <span>Profumo</span>
                    <p>{this.props.elem.response}</p>
                </Response>
            }

        </Container>
    )
    }
}

const Container = styled.div`
    margin-top: 30px;
`;

const Comment = styled.div`
    background: #dddddd;
    padding: 20px;
    border-radius: 10px;
`;
const Response = styled.div`
    margin-top: 10px;
    background: #eeeeee;
    padding: 20px;
    margin-left: 100px;
    border-radius: 10px;
`;

const Username = styled.span`
    font-size: 14pt;
    margin-right: 20px;
`;

const Verified = styled.span`
    color: #2bac2b;
    font-size: 14pt;
    margin-left: 20px;
    font-weight: bold;
`;

const DeleteComment = styled(FontAwesomeIcon)`
    float: right;
    cursor: pointer;    
`;