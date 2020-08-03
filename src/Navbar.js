import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import { Container, Menu } from 'semantic-ui-react';

export default withAuth(class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/');
    }

    async logout() {
        this.props.auth.logout('/');
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                <div>
                    <Container>
                        <Menu.Item as="a" header href="/">
                            Okta-React Sample Project
                        </Menu.Item>
                        {this.state.authenticated === true && <Menu.Item id="movies-button" as="a" href="/movies">Movies</Menu.Item>}
                        {this.state.authenticated === true && <Menu.Item id="logout-button" as="a" onClick={this.logout}>Logout</Menu.Item>}
                        {this.state.authenticated === false && <Menu.Item as="a" onClick={this.login}>Login</Menu.Item>}
                    </Container>
                    </div>
                </Menu>
            </div>
        );
    }
});
