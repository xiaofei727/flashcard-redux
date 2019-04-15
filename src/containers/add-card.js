import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeckList from './deck-list';
import DeckDetail from './deck-detail';
import { connect } from 'react-redux';
import { addCard } from '../actions/index';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class AddCard extends Component {

	handleSubmit(e) {
		e.preventDefault();

		// create new card
		var cardQuestion = ReactDOM.findDOMNode(this.refs.cardQuestion);
		var cardAnswer = ReactDOM.findDOMNode(this.refs.cardAnswer);
		var newCard = { question: cardQuestion.value, answer: cardAnswer.value };

		// call addCard action creator
		this.props.addCard(newCard, this.props.activeDeck.id); 
		
		browserHistory.push('/');
	}

	render() {

		return (
			<div className='row'>

				<DeckList />

				<div className='col-md-8'>

					<form onSubmit={ event => this.handleSubmit(event) }>
						<h4 className='addNewCardTitle'>Create A New Card For { this.props.activeDeck['title'] }</h4>
						<div className='form-group'>
							<label>Question:</label>
							<input type='text' className='form-control' ref='cardQuestion' />
						</div>
						<div className='form-group'>
							<label>Answer:</label>
							<input type='text' className='form-control' ref='cardAnswer' />
						</div>
						
						<button type='submit' action='submit' className='btn btn-primary'>Submit</button>
					</form>
					
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
 	return {
 		decks: state.decks.decks,
 		activeDeck: state.decks.decks[state.activeDeckId]
 	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addCard: addCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);