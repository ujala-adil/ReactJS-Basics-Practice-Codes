import React, { Component } from 'react';
import classes from './App.css';  //Generated CSS classes can be imported as a JavaScript object storing the class names as property values (mapped to the original class Name)
// import Radium, { StyleRoot } from 'radium'; 
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';
// import { normalize } from 'path';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'sn-01', name: 'Max', age: 28 },
      { id: 'sn-02', name: 'Manu', age: 29 },
      { id: 'sn-03', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
    //You will do things like fetching new data from server.
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true; //react goes ahead and re-renders the entire component tree for this component whenever something changes in this component.
    //It doesn't update the real DOM but it check whether it needs to update the DOM internally.

    //Can be used for performance improvements.
  }

  componentDidUpdate() {
    console.log('[App.js] componentDid Update');
    //You will do things like fetching new data from server.
  } //You could also add getSnapshot hook before update hook here if you wanted to.

  // switchNameHandler = (newName) => {
  //   // console.log('Was clicked!');
  //   // DoN'T DO THIS: this,state.persons[0].name = 'Maximilian';
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 28 },
  //       { name: 'Manu', age: 29 },
  //       { name: 'Stephanie McMahon', age: 27 }
  //     ]
  //   })
  // }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });    //In this above code, we check the id to p.id (p.id is the each element of the persons array of objects (each person) that is being mapped by findIndex() ).

    const person = { ...this.state.persons[personIndex] };     //We make a copy of the targeted person

    // const person = Object.assign({}, this.state.persons[personIndex]); we will use the more modern approach; the spread operator one. you can absolutely both, there's no better etc.

    person.name = event.target.value;   //We assign the name typed into the input field to the name property of the person copy.

    const persons = [...this.state.persons]; //We make a copy of the original persons array of object (persons array of objects person) i.e. of the original state.

    persons[personIndex] = person; // We mutate the copy we made of the persons, and change/update the values of the targeted persons by assigning the new person to the targeted index person in the copy persons. 

    // this.setState({ persons: persons }); //Now we update the state.
    this.setState((prevState, props) => {
      return {
        persons: persons, changeCounter: prevState.changeCounter + 1
      };
    });
  };
  //setState is not guaranteed to execute and finish immediately, and the this.state is not guaranteed to be the latest state.
  //VERY IMPORTANT AND RECOMMENDED METHOD WHEN YOU WANT TO UPDATE STATE WHEN YOU ARE DEPENDING ON OLD STATE. 


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); use any one of the copy approach you like, but the spread operator one is the more modern one.
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] render');
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    // ':hover': {
    //   backgroundColor: 'lightgreen',
    //   color: 'black'
    // } //pseudo classes using radium
    // } //inline style
    //DRAWBACKS OF INLINE STYLE:
    // 1) We can't assign pseudo classes to the classes here. 

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated} />
        </div>
      );


      // style.backgroundColor = 'red';

      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
    }



    // if (this.state.showPersons) {
    //   persons = (
    //     <div>
    //       <Person
    //         name={this.state.persons[0].name}
    //         age={this.state.persons[0].age} />
    //       <Person
    //         name={this.state.persons[1].name}
    //         age={this.state.persons[1].age}
    //         click={this.switchNameHandler.bind(this, 'Max!')}
    //         changed={this.nameChangedHandler}  >My Hobbies: Racing</Person>
    //       <Person
    //         name={this.state.persons[2].name}
    //         age={this.state.persons[2].age} />
    //     </div>
    //   );
    // }

    return (
      // <WithClass className={classes.App}> before <Aux>
      <Aux>
        <button onClick={() => {
          this.setState({ showCockpit: false });
        }}>
          Remove cockpit
        </button>

        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}
        >
          {this.state.showCockpit ?
            (<Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
              login={this.loginHandler} />
            ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
      // </WithClass>
    );
  }
}


// export default Radium(App); //Higher Order Component.. We called Radium as function and wrapped our App in it.
export default withClass(App, classes.App);


// return (
// <StyleRoot>
// <div className={classes.App}>
//   <h1>Hi, I am a React App</h1>
//   <p className={assignedClasses.join('')}>This is really working.</p>
/* <button onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button> inefficient way of passing argument to function  */
// <button
//   // style={style} 
//   className={btnClass}
//   onClick={this.togglePersonsHandler}>Toggle Persons</button>
/* {
      this.state.showPersons === true ?
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Max!')}
            changed={this.nameChangedHandler}  >My Hobbies: Racing</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
      </div> : null
    } */

// {persons}
  //</div> 
 // </StyleRoot> 
 // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?')); 
// );


////////////////////HOOKS/////////////////////////
// import React, { useState } from 'react';
// const App = props => {

//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: 'Max', age: 28 },
//       { name: 'Manu', age: 29 },
//       { name: 'Stephanie', age: 26 }
//     ]
//   });

//   const [otherState, setOtherState] = useState('some other value');
//   console.log(personsState, otherState);


//   const switchNameHandler = () => {
//     setPersonsState({
//       persons: [
//         { name: 'Maxmilian', age: 28 },
//         { name: 'Manu', age: 29 },
//         { name: 'Stephanie McMahon', age: 27 }
//       ]
//     })
//   }

//     return (
//       <div className="App">
//         <h1>Hi, I am a React App</h1>
//         <p>This is really working.</p>
//         <button onClick={switchNameHandler}>Switch Name</button>
//         <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//         <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
//         <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
//       </div>
//       // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
//     );
// }


//   export default App;

///NOTES////
// ErrorBoundary:
// This is a higher order component becaiuse it wraps the person component to find error in it.
// The key prop of Person component is given to the ErrorBoundary component because this is now the outer element
// which we map and the key has always to be on the outer element in the map function
// Review video normalize. 5 in section no. 6. and the useful resources and links.

//Lifecycle lectures!