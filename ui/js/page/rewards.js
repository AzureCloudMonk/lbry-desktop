import React from 'react';
import lbry from '../lbry.js';
import Modal from '../component/modal.js';
import {Link} from '../component/link.js';

// Placeholder for something like api.lbry.io/reward_type/list */
function apiRewardTypeList() {
  return [
    {
      name: 'link_github',
      title: 'Link your GitHub account',
      description: 'Link LBRY to your GitHub account',
      value: 50,
      claimed: false,
    },
  ];
}

var RewardTile = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    title: React.PropTypes.string,
  },
  render: function() {
    return (
      <section className="card">
        <div className={"row-fluid card-content"}>
          <h3><Link label={this.props.title} href={'?reward=' + this.props.name} /></h3>
          <section>{this.props.description}</section>
          {this.props.claimed
              ? <span className="empty">This reward has been claimed.</span>
              : <Link button="primary" label="Start reward" href={'?reward=' + this.props.name} />}
        </div>
      </section>
    );
  }
});

var RewardsPage = React.createClass({
  componentWillMount: function() {
    this.setState({
      rewardTypes: apiRewardTypeList(),
    });
  },
  getInitialState: function() {
    return {
      rewardTypes: null,
    };
  },
  render: function() {
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <div className="card">
            <h2>Rewards</h2>
            {!this.state.rewardTypes
              ? null
              : this.state.rewardTypes.map(({name, title, description, claimed, value}) => {
                return <RewardTile name={name} title={title} description={description} claimed={claimed} value={value} />;
              })}
          </div>
        </form>
      </main>
    );
  }
});

export default RewardsPage;
