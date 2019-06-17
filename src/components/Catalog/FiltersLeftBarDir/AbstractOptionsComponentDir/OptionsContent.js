import React, {Component} from 'react'
import styled from 'styled-components'
import RadioButtonClickedImg from '../../../../resources/image/OptionsComponent/RadionButtonClicked.png'
import RadioButtonDefaultImg from '../../../../resources/image/OptionsComponent/RadionButtonDefault.png'
import SelectionButtonClickedImg from '../../../../resources/image/OptionsComponent/SelectionButtonClicked.png'
import SelectionButtonDefaultImg from '../../../../resources/image/OptionsComponent/SelectionButtonDefault.png'


export default class OptionsContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentType: props.contentType,
            content: props.content || [],
            clickedRadioID : 0,
            selections : props.content ? props.content.map(() => false) : []
    };

        this.renderRadios = this.renderRadios.bind(this);
        this.renderSelections = this.renderSelections.bind(this);
        this.radioClicked = this.radioClicked.bind(this);
        this.selectionClicked = this.selectionClicked.bind(this);
    }

    radioClicked(e, index) {
        this.setState({clickedRadioID: index});
    }

    selectionClicked(e, index) {
        this.state.selections[index] = !this.state.selections[index];

        this.setState({clickedRadioID: 0})
    }


    renderRadios() {
        return (
            <Container>
                {this.state.content.map((el, i) => {
                    return (
                        <Option key={i}>
                            <OptionButton
                                src={this.state.clickedRadioID == i ? RadioButtonClickedImg : RadioButtonDefaultImg}
                                onClick={(e) => this.radioClicked(e, i)}
                            />
                            <OptionDescription>
                                {el.description}
                            </OptionDescription>
                            {el.quantity ? <OptionQuantity>
                                    {el.quantity}
                                </OptionQuantity>
                                :
                                ""
                            }
                        </Option>
                    )
                })}
            </Container>
        )
    }

    renderSelections() {
        return (
            <Container>
                {this.state.content.map((el, i) => {
                    return (
                        <Option key={i}>
                            <OptionButton
                                src={this.state.selections[i] ? SelectionButtonClickedImg : SelectionButtonDefaultImg}
                                onClick={(e) => this.selectionClicked(e, i)}
                            />
                            <OptionDescription>
                                {el.description}
                            </OptionDescription>
                            {el.quantity ? <OptionQuantity>
                                    {el.quantity}
                                </OptionQuantity>
                                :
                                ""
                            }
                        </Option>
                    )
                })}
            </Container>
        )
    }

    render() {
        return (
            this.state.contentType === "selection" ? this.renderSelections() : this.renderRadios()
        )
    }
}

const Container = styled.ul`
    width: 280px;
    padding: 0;
    list-style: none;
`;

const Option = styled.li`
    padding: 20px;
    
    > * {
        vertical-align: middle;
    }
`;

const OptionButton = styled.img`
    width: 20px;
    height: 20px;
`;

const OptionDescription = styled.span`
    font-size: 13px;
    padding: 5px;
`;

const OptionQuantity = styled.span`
    font-size: 13px;
    float: right;
    padding: 5px;
    color: #B8BFD3;
`;