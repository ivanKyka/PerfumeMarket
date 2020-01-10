import React from 'react';
import styled from 'styled-components';
import {theme} from '../../stores/StyleStore'
import logo from '../../resources/image/icon.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default Notification = (message) => {
    return {
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
        duration: 5000,
        pauseOnHover: true
    },
        content: <Container>
            <img src={logo} alt=""/>
            <p>{message}</p>
            <FontAwesomeIcon icon={faTimes}/>
        </Container>
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 50px 200px 20px;
    grid-gap: 10px;
    background: #222328;
    padding: 5px;
    align-items: center;
    border-radius: 5px;
    color: white;
    border: ${theme.primary} 1px solid;
    z-index: 1000;
    img {
        height: 50px;
        width: 50px;
    }
    svg {
      color: #ccc;
    }
    
    &:hover {
        svg {
            color: black;
        }
    }
`;