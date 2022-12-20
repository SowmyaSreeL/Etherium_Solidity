import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import RequestRow from "../../../components/RequestRow";
import Campaign from "../../../ethereum/campaign";
import {Link} from '../../../routes';

class RequestIndex extends Component {
    static getInitialProps = async (props) => {
        const {address} = props.query;
        const campaign = Campaign(address);
        const reqCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(
            Array(parseInt(reqCount)).fill().map((ele, index) => {
                return campaign.methods.requests(index).call()
            })
        )
        return {address, requests, reqCount, approversCount};
    }

    renderRows() {
        return this.props.requests.map((req, index) => {
            return <RequestRow 
                key={index}
                id={index}
                request={req}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        })
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;
        return(
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
        )
    }
}

export default RequestIndex;