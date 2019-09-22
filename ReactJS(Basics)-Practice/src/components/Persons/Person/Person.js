import React, { Component /*, Fragment*/ } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary'
import classes from './Person.css'; //JS object which gives you access to a string version of your CSS styles/class. CSS class which was adjusted to be unique. 
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';
// import Persons from '../Persons';
// import { threadId } from 'worker_threads';
// import Radium from 'radium';


class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }


    //static property means that it can be accessed from outside without the need to instantiate an object based on this class first.
    static contextType = AuthContext; //This allows React to automatically connect this component (in this case Person) to your context BTS and it this gives you a property in this component the this.context propert.
//context API is all about managing data all across the components without the need to pass the data around with props.
    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
        //this.context property is given to you by React automatically.
    }

    render() {

        console.log('[Person.js] rendering...');

        return (
            <Aux> {/* <React.Fragment> OR <Fragment>*/}
                {/* <AuthContext.Consumer>
                {context => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                </AuthContext.Consumer> */}

                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>} {/*curly braces because JS*/}
                <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
                <p key='i2'>{this.props.children}</p>
                <input
                    key='i3'
                    // ref={(inputEl) => { this.inputElement = inputEl }}
                    ref={this.inputElementRef}
                    type='text'
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux> /* </React.Fragment>  OR </Fragment>*/
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}


export default withClass(Person, classes.Person);



// return [
//     <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>,
//     <p>{this.props.children}</p>,
//     <input type='text' onChange={this.props.changed} value={this.props.name} />
// ];


// const person = (props) => {
//     console.log('[Person.js] rendering...');
    // const style = {
    //     '@media (min-width=500px)': {
    //         width: '450px'
    //     }
    // };

    // return <p>I am a Person and I am {Math.floor(Math.random() * 30)} years old!</p>

    // return (
        // <div className="Person" style={style}>
//         <div className={classes.Person}>
//             <p onClick={props.click}>I am {props.name} and I am {props.age} years old!</p>
//             <p>{props.children}</p>
//             <input type='text' onChange={props.changed} value={props.name} />
//         </div>
//     )
// };

// export default Radium(person);
// export default person;