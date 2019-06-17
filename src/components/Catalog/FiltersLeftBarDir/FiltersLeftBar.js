import React, {Component} from 'react'
import styled from 'styled-components'
import CategoriesContainer from "./CategoriesDir/CategoriesContainer";
import OptionsContainer from "./AbstractOptionsComponentDir/OptionsContainer";
import {UrlStore} from "../../../stores/UrlStore";

export default class FiltersLeftBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        //console.log(new URL(window.location.href));

        fetch(UrlStore.CATEGORIES_URL).then((response) => {
            return response.json();
        }).then(data => {
            this.setState({categories: data.map((el) => {
                return {
                    key: el.key,
                    categoryTitle: el.label,
                    subcategories: el.children.map(el => {
                        return {
                            subcategoryTitle: el.label,
                            key: el.key
                        }
                    })
                }
                })})
        })
    }

    render() {
        return (
            <Container>
                <CategoriesContainer categories={this.state.categories}/>
                <OptionsContainer
                    optionsTitle={"Lorem"}
                    linkTitle={"Lorem"}
                    contentType={"selection"}
                    content={[
                        {
                            description: 'Lorem',
                            quantity: '40'
                        },
                        {
                            description: 'Lorem',
                            quantity: '100'
                        }
                    ]}
                />
                <OptionsContainer
                    optionsTitle={"Lorem"}
                    contentType={"selection"}
                    content={[
                        {
                            description: 'Lorem',
                        }
                    ]}
                />
                <OptionsContainer
                    optionsTitle={"Lorem"}
                    linkTitle={"Lorem"}
                    contentType={"radio"}
                    content={[
                        {
                            description: 'Lorem',
                            quantity: '40'
                        },
                        {
                            description: 'Lorem',
                            quantity: '100'
                        },
                        {
                            description: 'Lorem',
                            quantity: '1000'
                        }
                    ]}
                />
            </Container>
        );
    }
}

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    
    padding: 0 60px;
`;