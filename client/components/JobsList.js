import React, { Component, Proptypes } from 'react';
import Utils from '../utils/Utils';

class JobsList extends Component {
  constuctor(){
    this.addJobToKanban = this.addJobToKanban.bind(this);
  }

  addJobToKanban(job) {
    let card = [
      {
        card_id: job.jobkey,
        job_data: job,
        status: 'interested',
      }
    ];

    this.props.addCardsToKanban(card);

    let cardPositions = this.props.cardPositions;
    let cardIsInKanban = Boolean(cardPositions[job.jobkey] !== undefined);
    console.log("card positions before adding to kanban: ", cardPositions);
    console.log("card is in kanban: ", cardIsInKanban);

    if (!cardIsInKanban) {
      cardPositions[job.jobkey] = Object.keys(this.props.cardPositions).length;
      console.log("card positions before stringifying: ", cardPositions);
      cardPositions = JSON.stringify(cardPositions);

      let cardsAndPositions = {
        cards: card,
        cardPositions
      }
      
      console.log("card data to be persisted: ", cardsAndPositions);
      Utils.persistCardsToKanban(cardsAndPositions);
    } else {
      console.log("card is already in Kanban");
    }
    

  }

  render(){
    return (
      <div className="jobs">
        {this.props.jobs.map(job =>
          <div className="job" key={job.jobkey}>
            <h2>{job.jobtitle}</h2>
            <div className="description" dangerouslySetInnerHTML={{__html: job.snippet}}></div>
            <button onClick={() => this.addJobToKanban(job)}>Add to Kanban</button>
          </div>)}
      </div>
    )
  }
}

export default JobsList;