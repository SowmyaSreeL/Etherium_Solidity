import React, { Component } from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react'
import Layout from '../components/layout';
import {Link} from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns}
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true // to avoid full width for the card
            }
        });
        return <Card.Group items={items} />
    }


    render() {
        return (
            <Layout>
                <div>
                    <link
                        async
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                    />
                    <h1>Open campaigns</h1>
                    <h2>{this.renderCampaigns()}</h2>
                    <Link route='/campaigns/new'>
                        <a>
                            <Button 
                            floated='right'
                            content="Create Campaign"
                            icon="add circle"
                            primary />
                        </a>
                    </Link>
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;