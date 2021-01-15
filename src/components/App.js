import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        This is a sample stateful and server-side
        rendered React application.
        <br />
        <br />
        Here is a button that will track
        how many times you click it:
        <br />
        <br />
        <button onClick={() => alert('Clcker')}>Click Me</button>
      </div>
    );
  }
}



export default App;