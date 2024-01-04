import React, {Component} from 'react';
// import styled from 'styled-components'
import GotService from '../../services/gotService';
import './charDetails.css';


const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class CharDetails extends Component {
    gotService = new GotService();

    state = {
        char: null,
    }

    componentDidMount() {
        this.updateChar();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }
    
    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })

        //  this.foo.bar = 0;
    }
    
    render() {
        // const CharDetails = styled.div`
        //     background-color: #fff;
        //     padding: 25px 25px 15px 25px;
        //     margin-bottom: 40px;
        //     h4 {
        //         margin-bottom: 20px;
        //         text-align: center;
        //     }
        // `;

        if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }

        const {char} = this.state;
        const {name} = char;

        return (
            <div className="char-details rounded">
            {/* <CharDetails> */}
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                          return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            {/* </CharDetails> */}
            </div>
        );
    }
}