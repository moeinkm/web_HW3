import * as React from "react";
import { RouteProps, Route, Redirect, RouteComponentProps } from "react-router";
import { Dispatch, AnyAction } from "redux";



export default class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuth:
                typeof this.props.isAuth === "undefined" ? false : this.props.isAuth
        };
    }

     shouldComponentUpdate(nextProps) {
        if (nextProps.preventUpdate) {
            return false;
        }

        return true;
    }

     componentDidMount() {
        const { dispatch, authAction, authenticate, token } = this.props;

        if (dispatch && authAction) {
            dispatch(authAction);
        } else if (authenticate && token) {
            authenticate(token)
                .then(isAuth => this.setState({ isAuth }))
                .catch((err) => {
                    this.setState({ isAuth: false });
                });
        } else {
            this.setState({ isAuth: !!this.props.isAuth });
        }
    }

     render() {
        const { component: Component, ...rest } = this.props;
        const renderRoute = (props) =>

            this.props.isAuth ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            );

        return <Route {...rest} render={renderRoute} />;
    }
}
