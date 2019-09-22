import React, { PureComponent } from 'react';
import Person from './Person/Person';

//props will contain an array of person which we will convert into JSX

class Persons extends PureComponent {
  //PureComponent is a normal component which already contains the shouldComponentUpdate with a complete props check. It doesn't run shouldComponentUpdate and alos no other lifecycle hook. 

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // componentWillReceiveProps(props) { //coulda used for updating some internal state, but it was easy to use it incorrectly so you shouldn't use it anymore. 
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }
  //persons is an array.

  // shouldComponentUpdate(nextProps, nextState) { //function used to save performance; performance optimization.(internally/virtual DOM). Available only in class-based components.
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if (nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked) { // comparing pointers
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    // return null;
    return { message: 'Snapshot!' };
  }

  // componentWillUpdate() {
  //Ran right before componentDidUpdate(). You never really needed it but if you needed it you probably were using react incorrectly.
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
    //After the update is finished.
    //When you want to, for example, fetch new data from the server.
  }

  render() {
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((person, index) => { //props.persons... etc is simple JS
      return ( //returning JSX
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
          isAuth={this.props.isAuthenticated} />
      );
    })
  }

}

export default Persons;













// const persons = (props) => {
//   console.log('[Persons.js] rendering...');
//   return props.persons.map((person, index) => { //props.persons... etc is simple JS
//     return ( //returning JSX
//       <Person
//         click={() => props.clicked(index)}
//         name={person.name}
//         age={person.age}
//         key={person.id}
//         changed={(event) => props.changed(event, person.id)} />
//     );
//   })
// };

// export default persons;