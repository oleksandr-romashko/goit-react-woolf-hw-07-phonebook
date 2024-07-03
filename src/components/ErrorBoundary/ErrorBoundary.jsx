import React from "react";

import FallBackUI from "components/FallBackUI/FallBackUI";

/**
 * Handles rendering errors in component tree of child components.
 */
class ErrorBoundary extends React.Component {
  state = { 
    hasError: false, 
    cause: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, cause: error };
  }

  render() {
    if (this.state.hasError) {
      return <FallBackUI error={this.state.cause} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;