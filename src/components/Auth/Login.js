import React from 'react';
import Modal from 'react-responsive-modal';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";

export default class Login extends React.Component {

render() {
    return(
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Modal
                    open={this.props.open}
                    onClose={this.props.onClose}
                >

                </Modal>
            </ThemeProvider>
        </React.Fragment>
    )
    }
}
