import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default class Header extends React.Component{

    render() {
        return(
            <Container>
                <Menu>
                    <li>LOREM</li>
                    <li>LOREM</li>
                    <li>LOREM</li>
                    <li>LOREM</li>
                    <li>LOREM</li>
                    <li>LOREM</li>
                </Menu>
                <Search>
                    <SearchInput type="text" placeholder="Искать здесь..."/>
                    <SearchButton type="submit">
                        <FontAwesomeIcon icon={faSearch} size={'2x'}/>
                    </SearchButton>
                </Search>
            </Container>
        )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  background: #ececed;
`;

const Search = styled.div`
  position: relative;
  width: 200px;
  margin: 10px auto 0 auto;
  height: 42px;
`;

const SearchInput = styled.input`
  height: 42px;
  width: 0;
  padding: 0 42px 0 15px;
  border: none;
  border-bottom: 2px solid transparent;
  outline: none;
  background: transparent;
  transition: .9s cubic-bezier(0, 0.8, 0, 1);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  color: #222328;
  cursor: pointer;
  font-size: 16px;
  
  &:focus{
  width: 200px;
  z-index: 1;
  border-bottom: 2px solid #222328;
  }
`;

const SearchButton = styled.button`
  background: #ececed;
  border: none;
  height: 42px;
  width: 42px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  
  &:before{
  color: #ececed;
  }
  svg{
    cursor: pointer;
    color: #222328;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0 60px;
  margin: 0;
  
  li {
    display: inline-block;
    padding: 20px 10px;
    font-size: 12px;
    height: 20px;
    vertical-align: center;
    cursor: pointer;
    margin: 0 10px;
  }
  
  li:last-child{
    float: right;
    margin-right: 50px;
  }
  
  li:hover {
  padding: 20px 8px 20px 7px;
  background: #dbdbdc;
  font-weight: bold;
  }
`;

