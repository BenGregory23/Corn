import AnimatedLottieView from "lottie-react-native";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Text, View } from "react-native";



interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

    

    

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

        if (this.props.fallback) {
            return this.props.fallback;
        }
        else return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <AnimatedLottieView source={require("../../assets/speaker.json")} autoPlay loop style={{width: 100, height: 100}}/>
            <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Something went wrong</Text>
            <Text style={{color: "white", fontSize: 15}}>Please try again later</Text>
        </View>);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;