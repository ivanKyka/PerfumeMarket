import React from 'react';
import styled from 'styled-components'
import Icon1 from '../../resources/image/ProductIcons/Vector(2).svg'
import Icon2 from '../../resources/image/ProductIcons/Layer 1.svg'
import Icon3 from '../../resources/image/ProductIcons/guarantee.svg'
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";

export default class Links extends React.Component {

    render() {
        return (
                <Container>
                    <Link to={'/delivery'}>
                        <img src={Icon1} alt=""/>
                        <span>Доставка</span>
                    </Link>
                    <Link to={'/payment'}>
                        <img src={Icon2} alt=""/>
                        <span>Оплата</span>
                    </Link>
                    <Link to={'/warranty'}>
                        <img src={Icon3} alt=""/>
                        <span>Гарантия</span>
                    </Link>
                </Container>

        )
    }
}

const Container = styled.div`
    display: grid;
    height: 58px;
    grid-template-columns: repeat(3,min-content);
    justify-content: center;
    align-content: center;
    grid-gap: 20px;
    width: 80%;
    margin: 0 10%;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    
    a{
        display: grid;
        grid-template-columns: min-content minmax(min-content, min-content);
        align-items: center;  
        color: black;
        span{
          margin-left: 10px;
          margin-right: 20px;
          cursor: pointer;
        }
        &:hover span{
            color: ${theme.primary};
            text-decoration: underline;
        }
    }
`;