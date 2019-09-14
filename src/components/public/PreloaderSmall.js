import React from 'react';
import styled, {keyframes} from 'styled-components';
import {theme} from "../../stores/StyleStore";

export default class PreloaderSmall extends React.Component {

render() {
    return(
        <Ring>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Ring>
    )
    }
}

const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Ring = styled.div`
  display: block;
  position: relative;
  width: 5vw;
  height: 5vw;
  margin: 50px auto;
div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 4vw;
  height: 4vw;
  margin: .5vw;
  border: 4px solid ${theme.primary};
  border-radius: 50%;
  animation: ${Animation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${theme.primary} transparent transparent transparent;
}
div:nth-child(1) {
  animation-delay: -0.45s;
}
div:nth-child(2) {
  animation-delay: -0.3s;
}
div:nth-child(3) {
  animation-delay: -0.15s;
}
    
`;

