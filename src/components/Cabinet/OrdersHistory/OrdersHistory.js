import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../../stores/StyleStore";
import {getOrders} from "../../../api/Order";
import OrderPane from "./OrderPane";
import Preloader from "../../public/Preloader";
import MetaTags from "react-meta-tags";
import {Link} from "react-router-dom";
import ReactGA from "react-ga";


export default class OrdersHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            ready: false,
            currentFilter: 1
        }

        this.setFilters = this.setFilters.bind(this);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        getOrders().then(data => {
            this.setState({
                orders: data.sort((a,b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }),
                ready: true
            })
        })
    }


    setFilters = e => {
        this.setState({currentFilter: e.target.value - 0})
    }


    render() {
        if (!this.state.ready) return <Preloader/>
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <MetaTags>
                        <title>История покупок</title>
                    </MetaTags>
                    <Menu>
                        <Li value={'1'} onClick={this.setFilters} active={this.state.currentFilter === 1}>Все</Li>
                        <Li value={'2'} onClick={this.setFilters} active={this.state.currentFilter === 2}>За месяц</Li>
                        <Li value={'3'} onClick={this.setFilters} active={this.state.currentFilter === 3}>За год</Li>
                    </Menu>
                        <Container>
                            {this.state.orders.filter(order => {
                                if (this.state.currentFilter === 1) return true;
                                else if (this.state.currentFilter === 2) return new Date(order.createdAt).getMonth() === new Date().getMonth() && new Date(order.createdAt).getFullYear() === new Date().getFullYear()
                                else return new Date(order.createdAt).getFullYear() === new Date().getFullYear()
                            }).map(order => <OrderPane order={order} key={order.id}/>)}
                        </Container>
                    <Pagination/>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}


const Menu = styled.ul`
    list-style: none;
    margin: 0 0 10px 0;
    padding: 0;
`;

const Li = styled.li`
    display: block;
    cursor: pointer;
    color: ${props => props.active ? theme.primary : 'black'};
    text-decoration: ${props => props.active ? 'underline' : 'none'};
    margin-top: 5px;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: auto;
`;

const Pagination = styled.div`
    display: block;
    height: 60px;
    width: 100%;
`;