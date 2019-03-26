import React from 'react';
import styled from 'styled-components';

export default class PageCounter extends React.Component {

    render() {
        return(
            <Container>
                <PageCounters>
                    <li>
                        <PageButton active={true}>1</PageButton>
                    </li>
                    <li>
                        <PageButton>2</PageButton>
                    </li>
                    <li>
                        <PageButton>3</PageButton>
                    </li>
                    <li>
                        <PageButton>4</PageButton>
                    </li>
                    <li>
                        <PageButton>5</PageButton>
                    </li>
                    <li>
                        <PageButton>6</PageButton>
                    </li>
                    <li>
                        <PageButton>7</PageButton>
                    </li>
                </PageCounters>
            </Container>
        )
    }
}

const Container = styled.div`
  display: inline-grid;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${props => !props.active?'rgb(236, 236, 237)':'rgb(96, 96, 97)'};
  color: black;
  font-size: 15px;
  margin: 0 10px;
  border: 1px solid #bbb;
  border-radius: 2px;
  cursor: pointer;
  &:hover{
    background: ${props => !props.active?'rgb(189,189,190)':'rgb(96, 96, 97)'};
  }
`

const PageCounters = styled.ul`
  list-style: none;
  justify-self: center;
  li{
  float: left;
  }
`;