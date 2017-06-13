import React from 'react';
import ReactDOM from 'react-dom';


//Component Welcome
function Welcome(props) {
    let msg = <p>Hello, {props.name}</p>;
    switch(props.type) {
        case "bold":
            msg = <b>{msg}</b>; 
            break;
        case "italic":
            msg = <i>{msg}</i>
            break;
    }
    return msg;
}

//Function that creates an Welcome component
function createWelcome(name, type) {
    return <Welcome name = {name} type = {type} />;
}

//App component
//Components must return a single root element
function App() {
    return (
        <div>
            {createWelcome('Default')}
            {createWelcome('Bold','bold')}
            {createWelcome('Italic','italic')}
            {createWelcome('Error_Default','error')}
            <Clock></Clock>
        </div>
    );
}

//Clock class
class Clock extends React.Component {
    /*Clock's lifecycle:
    -> <Clock /> is passed to ReactDOM.render()
    -> React calls the constructor
    -> React calls the render() method
    -> When the Clock is inserted into the DOM, React calls
       componentDidMount()
    -> Every 1s the tick method is called, this method changes the state
    -> Since state has been changed, React calls render() again
    -> React updates the DOM accordingly
    -> If Clock is ever removed, React calls componentWillUnmount()
    */
    constructor(props) {
        super(props);
        //The only time this.state can be assigned is inside the constructor
        //After that, if state needs to be changed, call this.setState()
        this.state = {date: new Date()};
        this.tickInt = this.props.tick;
    }

    //Lifecycle methods (Lifecycle hooks)
    //The first time the component is rendered to the DOM
    //It is called 'Mounting' by React
    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            this.tickInt
        );
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    //When the component is removed it is called 'Unmounting'
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div>
                <p>It is {this.state.date.toLocaleTimeString()}</p>
            </div>
        );
    }
}

//Renderer
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
