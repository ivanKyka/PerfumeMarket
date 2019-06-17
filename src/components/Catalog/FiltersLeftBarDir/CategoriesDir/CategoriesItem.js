import React, {Component} from 'react'
import styled from 'styled-components'
import SpreadImgOpened from '../../../../resources/image/Categories/SpreadImgOpened.png'
import SpreadImgClosed from '../../../../resources/image/Categories/SpreadImgClosed.png'

export default class CategoriesItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryTitle: props.category.categoryTitle,
            subcategories: this.props.subcategories ? this.props.subcategories : [],
            isOpened: false
        };

        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(){
        this.setState({isOpened: !this.state.isOpened});
    }

    render() {
        return (
            <Container>
                <SpreadContainer onClick={this.buttonClicked}>
                    <SpreadButton src={this.state.isOpened ? SpreadImgOpened : SpreadImgClosed}/>
                    <CategoryTitle>
                        {this.state.categoryTitle}
                    </CategoryTitle>
                </SpreadContainer>
                <SpreadList isOpened={this.state.isOpened}>
                    {this.state.subcategories.map((el, i) => {
                        return (
                            <SpreadListItem key={el.key}>
                                {el.subcategoryTitle}
                            </SpreadListItem>
                        )
                    })}
                </SpreadList>
            </Container>
        )
    }
}

const Container = styled.li`
    width: 280px;
    
    border-bottom: 1px solid #DADADA;
`;

const SpreadContainer = styled.div`
    height: 20px;
    padding: 20px;
    
    :hover{
        background-color: rgba(196,196,255,0.41);
        cursor: pointer;
    }
`;

const SpreadButton = styled.img`
    width: 15px;
    height: 11px;
    float: right;
    background: transparent;
`;

const CategoryTitle = styled.span`
    font-size: 13px;
    float: left;
`;

const SpreadList = styled.ul`
    list-style: none;
    padding: 0;
    
    > :last-child{
        border-bottom: none;
    }
    
    ${props => props.isOpened ? "animation: 200ms ease-in-out opening;height: 100%;" : "animation: 200ms ease-in-out closing;height: 0px;overflow: hidden;"};
    
    @keyframes opening{
        from{
            height: 0;
        }
        to{
            height: 100%;
        }
    };
    
    @keyframes closing{
        from{
            height: 50px;
        }
        to{
            height: 0;
        }
    };
`;

const SpreadListItem = styled.li`
    border-top: 1px solid #DADADA;
    background-color: #f2f4f9;
    font-size: 13px;
    padding: 20px;
    cursor: pointer;
    
    :hover{
        background-color: #eaecf1;
    }
`;