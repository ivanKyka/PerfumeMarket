import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import {categoryTree} from "../../api/Categories";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {UrlStore} from "../../stores/UrlStore";
import ReactMarkdown from "react-markdown";

export default class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            categories: []
        }
        this.transformCategories = this.transformCategories.bind(this);
    }

    transformCategories = category => {
        return category.id;
    }

    componentWillMount() {
        categoryTree(true)
            .then(categories => {
                this.setState({
                    categories: categories.map(cat => this.transformCategories(cat)),
                    ready: true
                })
            })
    }

    render() {
        if (this.state.ready)
            return (
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <Title>КАТЕГОРИИ</Title>
                        <Container>
                            {this.state.categories.map(id =>
                                <Query query={
                                    gql`query($id: ID!){
                                      category(id: $id){
                                        name_ru
                                        desc
                                        category_photo{
                                            url
                                        }
                                      }
                                    }`
                                }
                                variables={{"id": id}}
                                key={id}
                                >
                                    {({loading, error, data}) => {
                                        if (loading) return <p></p>;
                                        if (error) {
                                            return <p>Error :(</p>;
                                        }
                                        if (data.category.category_photo === null) return ''
                                        return (
                                            <Category to={'/catalog/' + id}>
                                                <Image src={UrlStore.MAIN_URL + data.category.category_photo.url}/>
                                                <LinkToCategory to={'/catalog/' + id}>{data.category.name_ru}</LinkToCategory>
                                                <p>{data.category.desc}</p>
                                            </Category>
                                        );
                                    }}
                                </Query>
                            )}
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                        </Container>
                    </React.Fragment>
                </ThemeProvider>
            )
    }
}

const Container = styled.div`
    display: flex;
    flex: 25%;
    justify-content: space-around;
    padding: 20px;
    margin: 10px auto;
    flex-wrap: wrap;
    
    span{
        height: 1px;
        width: 250px;
        margin: 0 20px;
        display: block;
    }
`;

const Category = styled(Link)`
    width: 250px;
    display: grid;
    grid-template-rows: 250px 15px min-content;
    margin: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 3px 3px rgba(226,92,75,0.25);
    cursor: pointer;
    p {
        text-align: center;
    }
    &:hover{
        box-shadow: 0 0 3px 3px rgba(226,92,75,0.5);
        p{
            color: ${theme.primary_light};
        }
    }
`;

const Image = styled.img`
    height: 220px;
    width: 220px;
    align-self: center;
    justify-self: center;  
`;

const LinkToCategory = styled.p`
    color: ${props => props.theme.bgCol};
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    margin: 0;
    padding: 0;
`;

const Title = styled.h2`
    text-align: center;
    margin-top: 50px;
`;

//                     <Container>
//                    <Category>
//                        <Image src={perfumes}/>
//                        <LinkToCategory to={'/'}>Парфюмерия</LinkToCategory>
//                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis.</p>
//                   </Category>
//                     <Category>
//                         <Image src={makeup}/>
//                         <LinkToCategory to={'/'}>Макияж</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, eos.</p>
//                     </Category>
//                     <Category>
//                         <Image src={forFace}/>
//                         <LinkToCategory to={'/'}>Лицо</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                     </Category>
//                     <Category>
//                         <Image src={forBody}/>
//                         <LinkToCategory to={'/'}>Тело</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                     </Category>
//                     <Category>
//                         <Image src={hair}/>
//                         <LinkToCategory to={'/'}>Волосы</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                     </Category>
//                     <Category>
//                         <Image src={selective}/>
//                         <LinkToCategory to={'/'}>Ниша</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                     </Category>
//                     <Category>
//                         <Image src={accsessoures}/>
//                         <LinkToCategory to={'/'}>Аксессуары</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                     </Category>
//                     <Category>
//                         <Image src={specialOffer}/>
//                         <LinkToCategory to={'/'}>Акции</LinkToCategory>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit.</p>
//                     </Category>
//                 </Container>