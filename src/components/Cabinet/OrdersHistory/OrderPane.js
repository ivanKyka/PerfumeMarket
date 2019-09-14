import React from 'react';
import styled from "styled-components";
import OrderHead from "./OrderHead";
import {theme} from "../../../stores/StyleStore";
import ProductPane from "./ProductPane";
import StarRatings from "react-star-ratings";
import {sendFeedback} from "../../../api/Feedback";
import ProgressButton from 'react-progress-button';
import 'react-progress-button/react-progress-button.css'

export default class OrderPane extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rating: 5,
            sending: '',  //'', loading, success, error or disabled,
            opened: false
        }
        this.feedback = '';

        this.setRating = this.setRating.bind(this);
        this.setFeedback = this.setFeedback.bind(this);
        this.togglePane = this.togglePane.bind(this);
    }

    setRating = grade =>  {this.setState({rating: grade})}
    setFeedback = e => {this.feedback = e.target.value}

    sendFeedback = e => {
        e.preventDefault();
        this.setState({sending: 'loading'})
        let data = {
            text: this.feedback,
            order: this.props.order.id,
            rank: this.state.rating
        }
        sendFeedback(data).then(response => setTimeout(() => this.setState({sending: response?'success':'error'}),1500));
    }

    togglePane = () => {
        this.setState(oldState => ({opened: !oldState.opened}))
    }

    render() {
    return(
            <React.Fragment>
                <OrderHead order={this.props.order} togglePane={this.togglePane}/>
                <Container className={this.state.opened?'openeed':'closed'}>
                    {this.props.order.orders.map(elem => <ProductPane order={elem} key={elem.product.id}/>)}
                    <Payment>Cпособы оплаты <span>{this.props.order.type === 'liqpay'?'Электронный платеж (Liqpay)':'Оплата наличными (Новая почта)'}</span></Payment>
                    <Textarea>
                        <span>Способ доставки</span>
                        <textarea
                            readOnly={true}
                            value={`Новая почта. ${this.props.order.deliveryInfo.cityName}\n${this.props.order.deliveryInfo.postOfficeName}\n${this.props.order.deliveryInfo.surname} ${this.props.order.deliveryInfo.name} ${this.props.order.deliveryInfo.phone}\nТТН: ${this.props.order.newpost[0].IntDocNumber}`}
                            />
                    </Textarea>
                    <Rating>
                        <span>Поставить оценку</span>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor={theme.primary}
                            starEmptyColor={'gray'}
                            numberOfStars={5}
                            name='rating'
                            starDimension={'35px'}
                            starSpacing={'5px'}
                            changeRating={this.setRating}
                            starHoverColor={theme.primary_light}
                        />
                    </Rating>
                    <Textarea>
                        <span>Оставте отзывы</span>
                        <textarea onChange={this.setFeedback}/>
                    </Textarea>
                    <StyledProgressButton onClick={this.sendFeedback} state={this.state.sending}>
                        Отправить
                    </StyledProgressButton>
                </Container>
            </React.Fragment>
    )
    }
}


const Container = styled.div`
    padding-right: 10px;
    display: grid;
    grid-template-columns: 250px 150px 300px 80px 180px;
    justify-content: space-between; 
    align-content: center;
    font-size: 10pt;
    vertical-align: center;
    transition: all 1s linear;
    overflow: hidden;
    &.opened{
        height: auto;
        margin: 10px 0;
    }
    &.closed{
        height: 0;
        margin: 0;
    }
`;

const Payment = styled.p`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    font-size: 10pt;
    grid-column: 3/6;
    margin-top: 10px;
    span {
        text-align: right;
    }
`;

const Textarea = styled.div`
    display: grid;
    grid-column: 3/6;
    grid-template-columns: 150px 1fr;
    margin-top: 10px;
    
    textarea {
        resize: none;
        height: 100px;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 1px 1px #b2b2b2,  0 0 1px 1px #b2b2b2 inset;
        
        &:focus:not([readonly]) {
            box-shadow: 0 0 1px 1px ${theme.primary},  0 0 1px 1px ${theme.primary} inset;
        }
    }
`;

const Rating = styled.div`
    display: grid;
    grid-column: 3/6;
    grid-template-columns: 150px 225px;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    span{
        vertical-align: center;
        height: 20px;
    }
`;

const Button = styled.button`
    width: 300px;
    background: ${theme.primary};
    font-size: 12pt;
    color: white;
    border: none;
    border-radius: 5px;
    height: 35px;
    grid-column: 1/6;
    justify-self: right;
    margin-top: 10px;
    cursor: pointer;
    
    &:hover {
        background: ${theme.primary_light};
    }  
`;

const StyledProgressButton = styled(ProgressButton)`
    grid-column: 1/6;
    justify-self: right;
    margin-top: 15px;
    button {
        width: 300px !important;
        float: right !important;
        height: 55px !important;
        color: white !important;
        background: ${theme.primary} !important; 
    }
    
    button:hover {
        background: ${theme.primary_light} !important; 
    }
    
    .pb-progress-circle{
        height: 45px !important;
        width: 45px !important;
    }
    .pb-checkmark{
        height: 45px !important;
        width: 45px !important;
    }
    
    &.success .pb-button {
          border-color: ${theme.bgCol} !important;
          background-color:${theme.bgCol} !important;
    }
`;

