import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import image from '../../resources/image/Content/5.jpg'
import {Link} from "react-router-dom";

export default class CatalogCard extends React.Component {

render() {
    return(
        <ThemeProvider theme={theme}>
            <Container to={`/blog/${this.props.Data.id}`}>
                <Image src={image} alt=""/>
                <Name  to={`/blog/${this.props.Data.id}`}>
                    {this.props.Data.title}
                </Name>
                <DateMark>{new Date(this.props.Data.publishing).toLocaleDateString()}</DateMark>
            </Container>
        </ThemeProvider>
    )
    }
}

const Container = styled(Link)`
    display: grid;
    grid-template-rows: 250px min-content min-content;
    grid-template-columns: 300px;
    border: 1px;
`;

const Image = styled.img`
    object-fit: contain;
    display: block;
    max-height: 100%;
    padding: 0;
    margin: 0 auto;  
`;

const Name = styled.span`
    font-size: 11pt;
    color: ${props => props.theme.primary};
    
    &:hover {
        color: ${props => props.theme.primary_light};
        text-decoration: underline;
    }
    
`;

const DateMark = styled.span`
    font-size: 9pt;
    color: #888888;
    margin-top: 10px;
`;