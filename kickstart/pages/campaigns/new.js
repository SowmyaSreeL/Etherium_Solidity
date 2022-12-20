import React, {Component} from "react";
import Layout from "../../components/layout";
import factory from '../../ethereum/factory';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import {Router} from '../../routes';

class CampaignNew extends Component {
    state = {
        minContribution: '',
        errMsg: '',
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true, errMsg: ''})
        // Creating the new campaign
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minContribution)
            .send({
                from: accounts[0]
            })
            Router.pushRoute('/');
        } catch(err) {
            this.setState({errMsg: err.message})
        }
        this.setState({loading: false})
        
    }
    
    render() {
        return (   
            <Layout>
                <h1>New Campaign</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="Wei" 
                            labelPosition="right"
                            value={this.state.minContribution}
                            onChange={event => this.setState({minContribution: event.target.value})} />
                    </Form.Field>
                    <Message error header="Oops" content={this.state.errMsg} />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout> 
        )
    }
}

export default CampaignNew;