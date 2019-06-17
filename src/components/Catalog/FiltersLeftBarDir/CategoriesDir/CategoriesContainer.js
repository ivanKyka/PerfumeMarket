import React, {Component} from 'react'
import styled from 'styled-components'
import CategoriesItem from "./CategoriesItem";

export default class CategoriesContainer extends Component{
    render(){
        return(
            <Container>
                {this.props.categories ? this.props.categories.map((el, i) => {
                  return(
                      <CategoriesItem key={el.key} category={el} subcategories={el.subcategories}/>
                  )
                })
                    :
                    ""
                }
            </Container>
        )
    }
}

const Container = styled.ul`
    list-style: none;
    padding: 0;
    width: 280px;
    
    > :first-child{
        border-top: none;
    }
    
    > :last-child{
        border-bottom: none;
    }
`;