import React, { Component, ErrorInfo, ReactNode } from "react";
import { Text } from "react-native";
import { lightTheme, darkTheme } from "../../theme/theme";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

    // @ts-ignore
    lightMode = useSelector( state => state.appReducer.lightMode);
    theme = (this.lightMode === true) ? lightTheme : darkTheme;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Text style={{
        color: this.theme.text,
      }}>Sorry.. there was an error</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;