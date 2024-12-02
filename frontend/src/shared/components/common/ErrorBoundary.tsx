import React from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        toast.error('Something went wrong. Please try again.');
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
