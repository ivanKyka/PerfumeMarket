import React from 'react';
import styled from 'styled-components';
import StarRatings from "react-star-ratings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {deleteComment} from "../../api/Comments";
import {inject} from "mobx-react";
import male from '../../resources/image/ProductIcons/male.svg';
import female from '../../resources/image/ProductIcons/female.svg';
import {theme} from "../../stores/StyleStore";

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
            <Image src={this.props.elem.owner.gender === 'male'?male:female}/>
            <Comment>
                <Username>{this.props.elem.owner.name} {this.props.elem.owner.surname}</Username>
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
                {this.props.elem.owner._id === user._id?<AnimatedIcon
                    icon={faTimes}
                    size={'lg'}
                    key={this.props.elem._id}
                    onClick={this.clickHandler}/>:''}
                <p>{this.props.elem.text}</p>
            </Comment>
            {this.props.elem.response ===''?'':
                <Response>
                    <Image src={this.props.elem.owner.gender === 'male'?female:male}/>
                    <ResponseBody>
                        <span>Profumo</span>
                        <p>{this.props.elem.response}</p>
                    </ResponseBody>
                </Response>
            }
        </Container>
    )
    }
}

const Container = styled.div`
    display: grid;
    margin-top: 30px;
    min-height: 100px;
    grid-template-columns: 100px 1fr;
`;

const Comment = styled.div`
    background: #dddddd;
    position: relative;
    padding: 20px;
    border-radius: 10px;
    margin-left: 25px;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 25px solid transparent;
        border-right-color: #dddddd;
        border-left: 0;
        border-top: 0;
        margin-top: -12.5px;
        margin-left: -25px;
    }

`;

const Response = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-column: 2/3;
    margin-left: 25px;
`;

const ResponseBody = styled.div`
    grid-column: 2/3;
    margin-top: 10px;
    background: #eeeeee;
    position: relative;
    padding: 20px;
    margin-left: 25px;
    border-radius: 10px;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 25px solid transparent;
        border-right-color: #eeeeee;
        border-left: 0;
        border-top: 0;
        margin-top: -12.5px;
        margin-left: -25px;
    }
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

const Image = styled.img`
    height: 70px;
    width: 70px;
    padding: 5px;
    margin: auto 10px;
    border: #cccccc 2px solid;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #cccccc;
    
`;

const AnimatedIcon = styled(FontAwesomeIcon)`
    float: right; 
    color: ${props => props.color || 'black'};
    align-self: center;
    justify-self: center;
    height: ${props => props.height||'35px'};
    min-width: ${props => props.width||'35px'};
    padding: ${props => props.padding||'8px'};;
    transition: all 1.2s, color 0s;

    border-radius: 50%;
    background-position: center;
    cursor: pointer;
    
    &:hover{
        color: ${theme.primary};
    }

    &:active {
        color: black;
        background-color:  ${props => props.bgcolor||'rgba(227,111,100,0.51)'};
        background-size: 150%;
        transition: background 0s;
    }
`;