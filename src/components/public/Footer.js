import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';
import LogoImg from "../../resources/image/Logo.svg";
import {FacebookShareButton, TwitterShareButton, InstapaperShareButton} from "react-share";
import {UrlStore} from "../../stores/UrlStore";
import Query from "react-apollo/Query";
import gql from "graphql-tag";


export default class Footer extends React.Component{
    render() {
        return(
            <Container>

                    <Foot1>
                        <Logo>
                            <Link to={'/'}>
                                <img src={LogoImg}/>
                            </Link>
                        </Logo>
                    </Foot1>

                    <Foot2>
                        <Menu>
                            <ListPoint><Link to={'/'}>ГЛАВНАЯ</Link></ListPoint>
                            <ListPoint><Link to={'/contacts'}>КОНТАКТЫ</Link></ListPoint>
                            <ListPoint><Link to={'/blog'}>БЛОГ</Link></ListPoint>
                            <ListPoint><Link to={'/aboutUs'}>О НАС</Link></ListPoint>
                            <ListPoint><Link to={'/delivery'}>ДОСТАВКА</Link></ListPoint>
                        </Menu>

                    </Foot2>
                    <Foot3>
                        <FacebookShareButton  url={UrlStore.MAIN_URL}>
                            <MenuIconFoot>
                                <FontAwesomeIcon icon={faFacebook} size={'2x'}/>
                            </MenuIconFoot>
                        </FacebookShareButton>
                        <InstapaperShareButton  url={UrlStore.MAIN_URL}>
                            <MenuIconFoot>
                                <FontAwesomeIcon icon={faInstagram} size={'2x'}/>
                            </MenuIconFoot>
                        </InstapaperShareButton>
                        <TwitterShareButton  url={UrlStore.MAIN_URL}>
                            <MenuIconFoot>
                                <FontAwesomeIcon icon={faTwitter} size={'2x'}/>
                            </MenuIconFoot>
                        </TwitterShareButton>
                    </Foot3>

                <Query query={gql`query{
                                  contacts{
                                    phones
                                  }
                                }`}>
                    {({loading, error, data}) => {
                        if (loading) return <p/>
                        if (error) return <p/>
                        return <Numbers>
                            <p>{data.contacts[0].phones.split(',').join(' ')}</p>
                            <span>Есть вопросы? Звоните, мы поможем! &nbsp;	&nbsp;	&nbsp; понедельник-субота с 9:00 до 20:00</span>
                        </Numbers>
                    }}
                </Query>
                <FootLine>
                        <Line/>
                    </FootLine>


                    <Foot4>
                        <span>Пользуясь даным веб-сайтом, вы даете свое согласие на использование файлов cookies. Если вы не согласны с условиями использования, пожалуйста покиньте даный веб-сайт</span>
                    </Foot4>

                    <Foot5>
                        <Link to={'/user_agreement'}>ПРИВАТНОСТЬ</Link>
                        <Link to={'/license'}>ЛИЦЕНЗИОННОЕ СОГЛАШЕНИЕ</Link>
                    </Foot5>



            </Container>
        )
    }
}
const Container = styled.div`
  background-color: #222328;
  padding: 0;
  margin: 0;
 
 
  @media(min-width: 1000px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 99px 50px 1px 149px;
      height: 300px;
  }
  @media(max-width: 999px) {
      padding: 10px;
      
      * {
        margin-bottom: 15px;
      }
  } 
`;
const Foot1 = styled.div`
  color: #ffffff;
  align-self: center;
  @media(min-width: 1000px) {
      padding-left: 100px;
  }
  @media(max-width: 999px) {
      img {
          margin: 0 auto;
      }
  }
`;
const Foot2 = styled.div`
  align-self: center;
  @media(min-width: 1000px) {
      grid-column: 2/4;
  }
  @media(max-width: 999px) {
      display: none;
  }
`;
const Menu = styled.ul`
  list-style: none;
  text-align: center;
  padding: 0;
`;
const ListPoint = styled.li`
  display: inline-block;
  color: #ffffff;
  font-size: 1.1vw;
  margin-right: 10px;
  a{
    text-decoration: none;
    color: white;
    
    &:hover{
      text-decoration: underline;
      color: white;
    }
  }
`;
const Foot3 = styled.div`
   display: grid;
   grid-template-columns: 45px 45px 45px;
   align-self: center;
   justify-self: center;
    @media(min-width: 1000px) {
        
    }
    @media(max-width: 999px) {
        height: 35px;
        grid-template-rows: 35px;
        margin: 15px calc(50% - 65px);
    }

`;

const MenuIconFoot = styled.svg`
  margin-right: 20px;
  height: 32px;
  width: 28px;
  color: #e1e1e2;
  cursor: pointer;
  
  &:hover{
    color: #fff;
  }
`;
const FootLine = styled.div`
 grid-column-start: 1;
 grid-column-end: 5;
 
      @media(max-width: 999px) {
          display: none;
      }
 
`;
const Line = styled.hr`
 border: 0;
 height: 2px;
 background: rgba(50, 51, 53,0.3);
 margin: 0 100px 0 100px;
`;
const Foot4 = styled.div`
  @media(min-width: 1000px) {
      grid-column: 1/3;
      padding-left: 100px;
  }
  @media(max-width: 999px) {
      display: block;
      padding: 25px;
  }
 text-align: justify;
 color: #CAC9D2;
 font-size: 12pt;
 align-self: center;
`;
const Foot5 = styled.div`
  @media(min-width: 1000px) {

  }
  @media(max-width: 999px) {
      padding: 0 25px;
  }
grid-column-start: 3;
grid-column-end: 5;
align-self: center;
justify-self: center;
//padding-right: 100px;

 a:link{
  color: #CAC9D2;
  text-decoration: none;
  font-size: 11pt;
  margin-right: 40px;
 }
 a:visited{
  color: #CAC9D2;
 }
 
 a:last-of-type {margin-right: 0;}
`;

const Logo = styled.div`
  @media(min-width: 1000px) {

  }
  @media(max-width: 999px) {

  }
  display: block;
  height: 50px;
  align-self: center;
  a{
    display: block;
    height: 50px;
    text-decoration: none;
    color: white;
  }
  img{
      height: 50px;
      align-self: center;
      display: block;
      justify-content: right;
      cursor: pointer;
  }
`;

const Numbers = styled.div`
     color: #CAC9D2;
     display: grid;
     height: 30px;
     grid-column: 1/5;
     p, span{
        margin: 0;
        padding: 0;
        font-size: 15pt;
     }
     
     p{
        text-align: center;
        font-weight: bold;
        padding: 2px 5px;
     }
     
     
     span {
        width: 100%;
        font-size: 9px;
        text-align: center;
        padding: 5px;
     } 

     
`;