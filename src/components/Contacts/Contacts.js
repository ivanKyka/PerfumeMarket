import React from 'react';
import styled from 'styled-components';
import {theme} from "../../stores/StyleStore";
import ReactMarkdown from "react-markdown";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Header from "../public/Header";
import Footer from "../public/Footer";
import {sendFeedback} from "../../api/Feedback";
import ProgressButton from "react-progress-button";
import MetaTags from "react-meta-tags";

export default class Contacts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sending: ''
        }
        this.info = {
            text: "",
            name: "",
            phone: "",
            theme: "",
            email: ""
        }

        this.setProperty = this.setProperty.bind(this);
    }

    setProperty = e => {
        this.info[e.target.name] = e.target.value;
    }

    send = e => {
        e.preventDefault();
        this.setState({sending: 'loading'})
        let data = {
            text: 'Тема: ' + this.info.theme + ';\n' + this.info.text,
            phone: this.info.phone,
            email: this.info.email,
            name: this.info.name
        }
        sendFeedback(data).then(response => setTimeout(() => this.setState({sending: response?'success':'error'}),1500));
    }

render() {
    return(
        <React.Fragment>
            <MetaTags>
                <title>Наши контакты</title>
            </MetaTags>
            <Header/>
            <Title>Наши контакты</Title>
            <Container>
                <Query query={gql`
                                query{
                                  contacts{
                                    contacts_block
                                  }
                                }`}>
                    {({loading,error,data}) => {
                        if (loading) return <p/>
                        if (error) return <p>Error :(</p>
                        return (
                            <MarkdownContainer>
                                <ReactMarkdown source={data.contacts[0].contacts_block}/>
                            </MarkdownContainer>)
                    }}
                </Query>
                <Form onSubmit={() => {}}>
                    <h3>напишите нам сообщение</h3>
                    <Input
                        type={'text'}
                        placeholder={'Ваше имя'}
                        name={'name'}
                        onChange={this.setProperty}
                    />
                    <Input
                        type={'email'}
                        placeholder={'Ваш e-mail'}
                        name={'email'}
                        onChange={this.setProperty}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Ваше номер телефона'}
                        name={'phone'}
                        onChange={this.setProperty}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Тема сообщения'}
                        name={'theme'}
                        onChange={this.setProperty}
                    />
                    <Textarea
                        spellCheck={"false"}
                        name={'text'}
                        placeholder={'Текст сообщения'}
                        onChange={this.setProperty}
                    />
                    <StyledProgressButton onClick={this.send} state={this.state.sending}>
                        Отправить
                    </StyledProgressButton>
                </Form>

            </Container>
            <Footer/>
        </React.Fragment>
    )
    }
}

const Title = styled.h1`
    width: 100%;
    text-align: center;
    margin: 25px auto ;
    font-weight: bold;
`;

const MarkdownContainer = styled.div`
    min-height: 475px;
    font-size: 10pt;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 0 1px 1px #949494, 0 0 1px 1px #949494 inset;
    border: none;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 400px 400px;
    grid-gap: 50px;
    justify-content: center;
    min-height: calc(100vh - 360px);
    margin-bottom: 20px;
    *{
        display: block;
    }
    
    a {
        display: inline-block;
    }
    
    img {
        max-width: 100%;
        object-fit: contain;
        margin: auto;
        margin-bottom: 20px;
    }
    
    p {
        text-align: justify;
        letter-spacing: 0px;
        line-height: 140%;
    }
    
    em{
        margin-bottom: 10px;
    }
    
    h1,h2,h3,h4,h5,h6 {
        text-align: center;
    }
    
    li {
        display: list-item; 
        line-height: 140%;
    }
`;

const Form = styled.form`
    background: #e9e9e9;
    border-radius: 15px;
    padding-bottom: 25px;
    
    h3 {
        color: ${theme.primary};
    }
`;

const Input = styled.input`
    height: 45px;
    padding: 15px 5px 5px 15px;
    display: block;
    width: 300px;
    margin: 10px auto;
    border-radius: 7px;
    box-shadow: 0 0 1px 1px #949494, 0 0 1px 1px #949494 inset;
    border: none;
    font-size: 12pt;
    
    &:focus {
        box-shadow: 0 0 1px 1px ${theme.primary}, 0 0 1px 1px ${theme.primary} inset;
    }
`;

const Textarea = styled.textarea`
    height: 120px;
    padding: 15px 5px 5px 15px;
    display: block;
    width: 300px;
    margin: 10px auto;
    border-radius: 7px;
    box-shadow: 0 0 1px 1px #949494, 0 0 1px 1px #949494 inset;
    border: none;
    resize: none;
    font-size: 12pt;

    &:focus {
        box-shadow: 0 0 1px 1px ${theme.primary}, 0 0 1px 1px ${theme.primary} inset;
    }
`;

const Button = styled.button`
    height: 35px;
    width: 250px;
    margin: 10px auto;
    background: ${theme.primary};
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 12pt;
    cursor: pointer;
    
    &:hover {
        background: ${theme.primary_light};
    }  
`;

const StyledProgressButton = styled(ProgressButton)`
    margin-top: 15px;
    
    button {
        width: 250px !important;
        height: 35px !important;
        color: white !important;
        background: ${theme.primary} !important; 
        margin: 0 auto !important;
        padding: 0 !important;
    }
    
    button:hover {
        background: ${theme.primary_light} !important; 
    }
    
    .pb-progress-circle{
        height: 25px !important;
        width: 25px !important;
        display: block !important;
        margin-left: 112px !important;
    }
    .pb-checkmark{
        height: 25px !important;
        width: 25px !important;
        margin-left: 115px !important;
}
    
    &.success .pb-button {
          border-color: ${theme.bgCol} !important;
          background-color:${theme.bgCol} !important;
    }
`;