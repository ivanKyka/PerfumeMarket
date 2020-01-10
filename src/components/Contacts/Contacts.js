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
import marked from 'marked'
import viber from "../../resources/image/SocialIcons/viber.png";
import whatsap from "../../resources/image/SocialIcons/whatsap.png";
import telegram from "../../resources/image/SocialIcons/telegram.png";
import ReactNotification, {store} from "react-notifications-component";
import Notification from "../public/Notification";
import ReactGA from "react-ga";

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
        this.setState({sending: 'loading'});
        if (this.info.phone === '' || this.info.email === '' || this.info.text === ''){
            this.setState({sending: 'error'});
            setTimeout(() => {this.setState({sending: ''})},1000)
        }
        else {
            let data = {
                text: 'Тема: ' + this.info.theme + ';\n' + this.info.text,
                phone: this.info.phone,
                email: this.info.email,
                name: this.info.name
            }
            sendFeedback(data).then(response =>
                setTimeout(() => {
                    this.setState({sending: response?'success':'error'})
                    store.addNotification(Notification('Спасибо за ваше сообщение. Мы обязательно вам ответим!'));
                },1500));

        }
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
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
                                    telegram
                                    whats_app
                                    viber
                                    meta_title
                                    meta_keywords
                                    meta_decription
                                  }
                                }`}>
                    {({loading,error,data}) => {
                        if (loading) return <p/>
                        if (error) return <p></p>
                        return (
                            <>
                                <MetaTags>
                                    <meta name='title' content={data.contacts[0].meta_title}/>
                                    <meta name='keywords' content={data.contacts[0].meta_keywords}/>
                                    <meta name='decription' content={data.contacts[0].meta_decription}/>
                                </MetaTags>
                            <MarkdownContainer id={'container'}>
                                <div dangerouslySetInnerHTML={{__html: marked(data.contacts[0].contacts_block).replace('!social_links', `<div
                                    class="links-container">
                                    <a href="${data.contacts[0].viber}"><img src="src/resources/image/SocialIcons/viber.png"/></a>
                                    <a href="${data.contacts[0].whats_app}"><img src="src//resources/image/SocialIcons/whatsap.png"/></a>
                                    <a href="${data.contacts[0].telegram}"><img src="src/resources/image/SocialIcons/telegram.png"/></a>
                                </div>`)}}/>
                            </MarkdownContainer>
                            </>)
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
                        placeholder={'Ваш номер телефона'}
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
                        отправить
                    </StyledProgressButton>
                </Form>

                <ReactNotification/>
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
    
    .links-container{
        display: grid !important;
        grid-template-columns: repeat(3, 40px);
        grid-gap: 30px;
        height: 40px;
        img{
            cursor: pointer;
            max-height: 40px;
            max-width: 40px;
            object-fit: contain;
        }
    }
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 400px 400px;
    grid-gap: 50px;
    justify-content: center;
    min-height: calc(100vh - 360px);
    margin-bottom: 20px;
    
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
    outline: none;
    &:focus {
        box-shadow: 0 0 1px 1px ${theme.primary}, 0 0 1px 1px ${theme.primary} inset;
    }
    &::placeholder {
        font-family: "Gotham Pro";
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
    font-family: "Gotham Pro" !important;
    outline: none;
    &:focus {
        box-shadow: 0 0 1px 1px ${theme.primary}, 0 0 1px 1px ${theme.primary} inset;
    }
`;


const StyledProgressButton = styled(ProgressButton)`
    margin-top: 15px;
    
    button {
        width: 250px !important;
        height: 40px !important;
        color: white !important;
        background: ${theme.primary} !important; 
        margin: 0 auto !important;
        padding: 0 !important;
        border-radius: 5px !important;
        border: none !important;
        outline: none !important;
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
    .pb-cross{
        height: 25px !important;
        width: 25px !important;
        margin-left: 123px !important;
    }
    
    &.success .pb-button {
          border-color: ${theme.bgCol} !important;
          background-color:${theme.bgCol} !important;
    }   
    &.error .pb-button {
          border-color: ${theme.bgCol} !important;
          background-color:${theme.bgCol} !important;
    }
`;