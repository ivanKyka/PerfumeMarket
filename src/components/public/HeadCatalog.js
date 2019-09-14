import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {categoryTree} from "../../api/Categories";
import {Menubar} from "primereact/menubar";
import './HeadCatalogStyles.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css'
import {theme} from "../../stores/StyleStore";
import {Redirect} from "react-router";

export default class HeadCatalog extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            items: [],
            isSearch: false
        };
        this.searchExpr = '';
    }

    searchHandler = (e => {
        e.preventDefault();
        if (this.searchExpr !== '')
        this.setState({
            isSearch: true
        })
    }).bind(this);

    componentDidMount() {
        categoryTree(true).then(a => {
            this.setState({
                items: a
            })
        })
    }

    //Я знаю що це неправильно, але я не збираюся переписувати бібліотеку, чи писати свою реалізацію
    //P.S. Це було б тупіше за це
    componentDidUpdate() {
        Array.from(document.querySelectorAll('.p-menubar-root-list>.p-menuitem')).forEach(elem => {
            elem.addEventListener('mouseenter',
                (e) => {
                e.target.classList.add('p-menuitem-active');
            })
        })
        Array.from(document.querySelectorAll('.p-menuitem')).forEach(elem => {
            elem.addEventListener('mouseleave',
                (e) => {
                e.target.classList.remove('p-menuitem-active');
            })
        })
    }
    componentWillUpdate() {
        if (this.state.isSearch) {
            location.reload();
        }
    }

    setExpression = (e => {
        e.preventDefault();
        this.searchExpr = e.target.value;
    }).bind(this);


    render() {
        if (this.state.isSearch)
            return <Redirect to={'/catalog/&' + this.searchExpr}/>;
        return(
            <ThemeProvider theme={theme}>
            <Container>
                <Menubar
                    model={this.state.items}
                />
                <Search onSubmit={this.searchHandler}>
                    <SearchInput
                        type="text"
                        placeholder="Поиск"
                        ref={this.inputRef}
                        onChange={this.setExpression}
                    />
                    <SearchButton type="submit">
                        <FontAwesomeIcon icon={faSearch} size={'2x'} onClick={this.searchHandler}/>
                    </SearchButton>
                </Search>
            </Container>
            </ThemeProvider>
        )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  background: #fff;
  height: 52px;
  padding: 0 50px;
  z-index: 1000;
  .p-menubar.p-component{
    border: none;
  }
  
  .p-menubar-root-list>.p-menuitem>.p-menuitem-link{
    height: 52px;
  }
  
  .p-menuitem-text {
    font-family: "Gotham Pro" !important;
  }
  
`;

const Search = styled.form`
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

