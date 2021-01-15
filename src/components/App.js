import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div class="grid-container">
        <div class="grid-item" id="grid-1">Images Flexbox</div>
        <div class="grid-item" id="grid-2">Product Header</div>
        <div class="grid-item" id="grid-3">Product Body</div>
      </div>
    );
  }
}



export default App;