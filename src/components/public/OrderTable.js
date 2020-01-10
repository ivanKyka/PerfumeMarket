import React from 'react';
import OrderRow from "./OrderRow";

export default class OrderTable extends React.Component {

    //props: data(required)

    tableStyles = {
        borderCollapse: 'collapse',
        margin: '10px auto'
    }

    render() {
        return(
            <table style={this.tableStyles}>
                <thead>
                <td style={{border: '1px solid gray'}}>№</td>
                <td style={{border: '1px solid gray'}}>Фото</td>
                <td style={{border: '1px solid gray'}}>Имя</td>
                <td style={{border: '1px solid gray'}}>Цена</td>
                <td style={{border: '1px solid gray'}}>Количество</td>
                <td style={{border: '1px solid gray'}}>Всего</td>
                </thead>
                <tbody>
                {this.data.props.map((elem,index) =>
                    <OrderRow
                        index={index + 1}
                        key={elem.product.id}
                        id={elem.product.id}
                        count={elem.count}
                    />)}
                </tbody>
            </table>
        )
    }
}