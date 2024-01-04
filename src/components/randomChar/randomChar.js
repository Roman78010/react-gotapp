import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
    gotServices = new GotService();

    state = {
        char: {},
        loading: true,
        isDisplay: true,
    }

    static defaultProps = {
        interval: 15000
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false,
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    } 
    
    updateChar = () => {
        const id = Math.floor(Math.random()* 140 + 25); // 25-140
        // const id = 199092;
        this.gotServices.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    
    toggleDisplayRandomBlock = () => {
        this.setState({
            isDisplay: !this.state.isDisplay,
        });
    }
    
    render() {
        const { char, loading, error, isDisplay } = this.state;

        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error) ? <View char={char}></View> : null;

        let style = isDisplay ? { display: 'block' } : { display: 'none' };

        return (
            <>
                <div className="random-block rounded" style={style}>
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
                {/* <button className='random-btn' onClick={this.toggleDisplayRandomBlock}>Toggle Display Random Block</button> */}
            </>
        );
    }
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}