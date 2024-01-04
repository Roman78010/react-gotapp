import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';

// import styled from 'styled-components'

// const ItemListStyled = styled.ul`
//     cursor: pointer;
// `

class ItemList extends Component {
    
    renderItems(arr) {
        return arr.map((item, i) => {
            // const {id} = item;
            // const label = this.props.renderItem(item);
            return (
                <li
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(41 + i)}
                >
                    {/* {label} */}
                    {item.name}
                </li>
            )
        })
    }
    
    
    render() {
        const {data} = this.props
        const items = this.renderItems(data);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}


// ItemList.defaultProps = {
//     onItemSelected: () =>  {},
// }

// ItemList.propTypes = {
//     onItemSelected: PropTypes.func
// }


const withData = (View, getData) => {
    return class extends Component {

    state = {
        data: null,
    }

    static defaultProps = {
        onItemSelected: () =>  {},
    }
    
    static propTypes = {
        onItemSelected: PropTypes.func
    }

    componentDidMount() {
        getData()
            .then((data) => {
                this.setState({
                    data,
                })
            })
    }
        
        render() {
            const {data} = this.state;

            if (!data) {
                return <Spinner></Spinner>
            }

            return <View {...this.props} data={data}/>
        }
    };
}


const {getAllCharacters} = new gotService()
export default withData(ItemList, getAllCharacters);