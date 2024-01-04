import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Routes, RouterProvider, Route } from 'react-router-dom';

import './app.css';

export default class App extends Component {
    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false,
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true,
        })
    }
    
    toggleRandomChar = () => {
        this.setState(state => {
            return {
                showRandomChar: !state.showRandomChar,
            }
        })
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        
        if (this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
        
        return (
        <Router>
            <div className="app">
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                        <button
                            className='toggle-btn'
                            onClick={this.toggleRandomChar}
                        >
                        Toggle Display Random Block
                        </button>
                        </Col>
                    </Row>
                    
                    <Routes>
                        <Route path='/character' element=<CharacterPage/>/>
                    </Routes>

                    <CharacterPage></CharacterPage>
                    
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </div> 
        </Router>
        );
    }
}


// import React, {useState, useEffect} from 'react';
// import './app';

// function App() {
//     const [count, setCount] = useState(0)
//     const [data, refreshData] = useState([{name: 'Ivan', sex: 'male'}])

//     useEffect(() => {
//         console.log(data)

//         updateChar();
//         let timerId = setInterval(this.updateChar, 15000);
        
//         return () => {
//             clearInterval(timerId);
//         }
//     })
    
//     return (
//         <>
//             <div>
//                 <p>You click {count}</p>
//                 <button onClick={() => setCount(count + 1)}>Click me!</button>
//             </div>
//             {data.map(item => {
//                 return (
//                     <div>Name: {item.name}, sex: {item.sex}</div>
//                 )
//             })}
//             <button onClick={() => refreshData(data => ([...data, {name: 'Alex', sex: 'male'}]))}>Add data</button>
//         </>
//     )
// }

// export default App;