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
  font-family: "Gilroy", sans-serif;
  height: 30px;
  border: 2px #ececed solid;
  background: #222328;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  width: 80px;
  cursor: pointer;
  font-weight: bold;
  justify-self: right;
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