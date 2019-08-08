import React from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {theme} from "../../stores/StyleStore";
import {Link} from "react-router-dom";

export default class SignInButton extends React.Component {




    render() {
            if (this.props.authorized)
                return (
                        <Name theme={theme}>
                            <Link to={'/cabinet'}>
                                <FontAwesomeIcon icon={faUser}/>
                                <span>{this.props.data.name} {this.props.data.surname}</span>
                            </Link>
                        </Name>
                );

            else {
                return (
                    <Button
                        onClick={this.props.openLogin}
                    >ВХОД</Button>
                )
            }
        }

}


const Button = styled.button`
  @media(min-width: 1000px) {
      border: 2px #ececed solid;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      height: 30px;
      width: 80px;
      justify-self: right;
  }
  @media(max-width: 1000px) {
      border: none;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      height: 60px;
      padding: 0 10px;
      width: 100%;
      justify-self: left;
      font-size: 12pt;
  }

  font-family: "Gilroy", sans-serif;
  background: #222328;
  cursor: pointer;
  font-weight: bold;
  color: white;
  &:hover {
    background: #0d0e11;
  }
  
  &:focus{
    outline: none;
  }
`;

const Name = styled.div`
    justify-self: right;

   a{
        display: grid;
        grid-template-columns: 20px 1fr;
        cursor: pointer;
        height: 60px;
        align-items: center;
        padding: 0 5px;
        text-decoration: none;
        color: white;
        &:hover{
          text-decoration: underline;
        }
        
        svg {
          margin-top: 2px;
        }
   }
`;