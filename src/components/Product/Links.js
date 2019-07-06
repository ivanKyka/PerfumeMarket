import React from 'react';
import styled from 'styled-components'
import Icon1 from '../../resources/image/ProductIcons/Vector(2).svg'
import Icon2 from '../../resources/image/ProductIcons/Layer 1.svg'
import Icon3 from '../../resources/image/ProductIcons/guarantee.svg'

export default class Links extends React.Component {

    render() {
        return (
                <Container>
                    <div>
                        <img src={Icon1} alt=""/>
                        <span>Доставка</span>
                    </div>
                    <div>
                        <img src={Icon2} alt=""/>
                        <span>Оплата</span>
                    </div>
                    <div>
                        <img src={Icon3} alt=""/>
                        <span>Гарантия</span>
                    </div>
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
    
    div{
        display: grid;
        grid-template-columns: min-content minmax(min-content, min-content);
        align-items: center;  
        
        span{
          margin-left: 10px;
          margin-right: 20px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
    }
`;