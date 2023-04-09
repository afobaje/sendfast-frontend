import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { break: "found",masL:['one','two','three'] };
  }
  componentDidCatch(error) {
    console.log(error);
  }
  static getDerivedStateFromError(error) {}
  
  render() {
    return (
      <div>
        <p>{this.state.masL}</p>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
          distinctio, ipsam reprehenderit culpa rerum perspiciatis nobis
          veritatis? Praesentium, eum sit?
        </div>
        <p>Hello world {this.state.break}</p>
      </div>
    );
  }
}
