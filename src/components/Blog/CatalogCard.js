import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {Link} from "react-router-dom";
import {UrlStore} from "../../stores/UrlStore";

export default class CatalogCard extends React.Component {

render() {
    return(
        <ThemeProvider theme={theme}>
            <Container to={`/blog/${this.props.Data.id}`}>
                <Image src={UrlStore.MAIN_URL + this.props.Data.header_photo.url || ''} alt=""/>
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
    grid-gap: 5px;
    grid-template-columns: 300px;
    border: 1px;
`;

const Image = styled.img`
    object-fit: contain;
    display: block;
    max-width: 100%;
    padding: 0;
    margin: auto;  
    align-self: center;
    justify-self: center;
`;

const Name = styled.span`
    font-size: 11pt;
    color: ${props => props.theme.primary};
    text-align: center;
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