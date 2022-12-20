import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errMsg: '',
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const campaign = Campaign(this.props.activeAddress);
        this.setState({loading: true, errMsg: ''})
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })
            Router.replaceRoute(`/campaigns/${this.props.activeAddress}`);
        } catch(err) {
            this.setState({errMsg: err.message})
        }
        this.setState({loading: false, value: ''})
    }
    render() {
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                        onChange={event => this.setState({value: event.target.value})}
                    />
                    <Message error header="Oops!!" content={this.state.errMsg}></Message>
                    <Button primary loading={this.state.loading}>
                        Contribute!
                    </Button>
                </Form.Field>
            </Form>
        )
    }
}

export default ContributeForm;