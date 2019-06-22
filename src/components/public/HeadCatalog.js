import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {categoryTree} from "../../api/Categories";
import {Menubar} from "primereact/menubar";
import './HeadCatalogStyles.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css'

export default class HeadCatalog extends React.Component{

    clickHandler = (e => {
        e.preventDefault();
        console.log('click');
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        categoryTree(true).then(a => {
            this.setState({
                items: a
            })
        })
    }

    render() {
        return(
            <Container>
                <Menubar
                    model={this.state.items}
                />
                <Search>
                    <SearchInput type="text" placeholder="Поиск"/>
                    <SearchButton type="submit">
                        <FontAwesomeIcon icon={faSearch} size={'2x'} onClick={this.clickHandler}/>
                    </SearchButton>
                </Search>
            </Container>
        )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  background: #fff;
  height: 52px;
  padding: 0 50px;
  .p-menubar.p-component{
    border: none;
  }
  
  .p-menubar-root-list>.p-menuitem>.p-menuitem-link{
    height: 52px;
  }
  
`;

const Search = styled.div`
  position: relative;
  width: 200px;
  margin: 5px 0 0 auto;
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
  transition: .3s ease-out;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  color: #222328;
  cursor: pointer;
  font-size: 16px;
  
  &:focus{
  cursor: text;
  width: 300px;
  z-index: 1;
  border-bottom: 2px solid #222328;
  padding: 0 0 0 15px;
  }
`;

const SearchButton = styled.button`
  background: #fff;
  border: none;
  height: 40px;
  width: 42px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 1;
  &:before{
  color: #ececed;
  }
  svg{
    cursor: pointer;
    color: #222328;
  }
`;

