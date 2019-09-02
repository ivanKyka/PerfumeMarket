import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import image from "../../resources/image/Content/5.jpg";
import {Link} from "react-router-dom";
import {UrlStore} from "../../stores/UrlStore";


export default class BlogCard extends React.Component {

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container>
                    <Image src={UrlStore.MAIN_URL + this.props.Data.header_photo.url} alt=""/>
                    <Desc>
                        <Name  to={`/blog/${this.props.Data.id}`}>
                            {this.props.Data.title}
                        </Name>
                        <Subtitle>{this.props.Data.short_desc}</Subtitle>
                        <DateMark>{new Date(this.props.Data.publishing).toLocaleDateString()}</DateMark>
                    </Desc>
                </Container>
            </ThemeProvider>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 230px 250px;
    grid-gap: 20px;
    width: 500px;
`;

const Image = styled.img`
    max-height: 230px;
    width: 230px;
    object-fit: contain;
`;

const Desc = styled.div`
    display: grid;
    grid-template-rows: min-content min-content 25px;
    padding: 25px 10px;
`;

const Name = styled(Link)`
    font-size: 14pt;
    color: ${props => props.theme.primary};
    justify-self: center;
    cursor: pointer;
    margin-bottom: 5px;
    &:hover {
        color: ${props => props.theme.primary_light};
        text-decoration: underline;
    }
    
`;

const DateMark = styled.span`
    font-size: 11pt;
    color: #696969;
    margin-top: 10px;
`;

const Subtitle = styled.p`
    margin: 0;
    font-size: 12pt;
    text-align: left;
    line-height: 140%;
`;