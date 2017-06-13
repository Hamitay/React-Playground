import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//App component
//Components must return a single root element
function App() {
    return (
        <Game />
    );
}

//Game component
class Game extends React.Component {
    render() {
        return (
            <body>
                <Field />
                <Input />
            </body>
        );
    }
}

//Field component
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state ={enemies: []};    
    }

    //Creates the enemy ticker
    componentDidMount() {
        this.timerId = setInterval(
            () => this.createEnemy(),
            1000
        );

        this.timerId2 = setInterval(
            () => this.isThereEnemyToKill(),
            1
        );
    }

    isThereEnemyToKill()
    {
        //Creates a list with enemy keys
        //Sees current input
        //Search for enemy with input key
        //Kills them
        return;
    }

    createEnemy()
    {
        let enemyArray = this.state.enemies;
        let newEnemy = randomEnemy();
        enemyArray.push(newEnemy);
        this.setState({enemies: enemyArray});
    }

    render() {
        return (
            <div className ="field">
                {this.state.enemies}
            </div>
        );
    }
}

//Enemie component
class Enemy extends React.Component {
    constructor(props) {
        super(props);
        this.state ={alive: true};
    }

    createName() {
        let text = "";
        let possible = "abcdefghijklmnopqrstuvwxyz";
        let size = Math.random()*8;

        for(let i = 0; i < size; i++)
        {
            text += possible.charAt(Math.floor(Math.random() *possible.length));
        }
        return text;
    }

    kill() {
        this.setState({alive: false});
    }

    render () {
        return (
            this.state.alive ?
            <div className = "enemy">
                <p className ="enemyName">{this.createName()}</p>
                <div className ="enemyBody"></div>
            </div>
            :
            null
        );
    }
}

//Enemy creator
function randomEnemy() {
    return (
        <Enemy name = "enemy" />
    );
}

//Input Component
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        if(event.target.value == 'boom')
        {
            this.setState({value: ''});
        }
    }

    render() {
        return(
             <form>
            <input type = "text" value={this.state.value} onChange={this.handleChange}/>
        </form>
        )
    }       
}

//Renderer
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
