import React, {Component} from 'react';
import CharDetails from '../charDetails';
import {Col, Row } from 'reactstrap';
import ItemList from '../itemList';


export default class BooksPage extends Component {
  render() {
    return (
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
    )
  }
}
