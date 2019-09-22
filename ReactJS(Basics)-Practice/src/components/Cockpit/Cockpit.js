import React, { useEffect, useRef, useContext } from 'react';

import AuthContext from '../../context/auth-context';
import classes from './Cockpit.css';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null); //null is passed as the initial value otherwise you can pass any value as the initial value.
    const authContext = useContext(AuthContext); //React will make the connection for you behind the scenes.

    console.log(authContext.authenticated);

    //ABOUT USEEEFFECT
    //Takes a function on default that runs on every render cycle of Cockpit and that includes the first one too.
    //Runs for every update or after every render cycle.
    //We can already use it 
    //It also runs when the component is created.
    //So it is componentDidMount and componentDidUpdate in one effect.
    //Second argument is an array where you simply pointa at all the variables or the data that actually are used in your effect.

    ////CLEANUP WORK IN USEEFFECT
    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');
    //     //HTTP Request...

    //     const timer = setTimeout(() => { // when component runs for the first time
    //         alert('Saved data to cloud!');
    //     }, 1000);
    //     return () => { //inside the first argument anonymous function.
    //         clearTimeout(timer); //to remove the timer when cockpit unmounts
    //         console.log('[Cockpit.js] cleanup work in useEffect'); //this line of code runs when cockpit unmounts
    //     };
    // }, []);

    //The function passed to the useEffect does not run immediately but it runs after the JSX renders for the first time.
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request...
        // setTimeout(() => { // this only executes when component runs for the first time
        //     alert('Saved data to cloud!');
        // }, 1000);

        toggleBtnRef.current.click();

        return () => { //inside the first argument anonymous function.
            console.log('[Cockpit.js] cleanup work in useEffect'); //this line of code runs when cockpit unmounts
        };
    }, []);


    //We only wanna run this code when our persons change. // [props.persons] 
    //If we wanna run this when the component renders for the first time, then we pass an empty array(it's a shortcut). This tells react this effect
    //has no dependencies and it should re-run whenever one of the dependencies changes. Now if you have no dependencies then they can never change
    //and this can never re-run. It will run for the first time i.e. the default but it will never again.
    //So if you just need componentDidMount then you pass an empty array as the second argument.

    //useEffect // as many useEffect functions as you want.

    //You don't need getDerivedStateFromProps here because if you have props here and you wanna base your state on that well than you can useState and pass on data from props as an initial state into this.
    // The anonymous function for cleanup runs before the main useEffect function runs, but after the (first) render cycle.
    //The cleanup one runs right when the useEffect runs for the last time. so when this is the case depends on the second argumnet that you pass to useEffect.
    //In case of [], useEffect will basically execute its first argument function only when that component rendered or when it is unmounted.

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => { //inside the first argument anonymous function.
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
        //This (the return statement/cleanup function) can also be useful in case you have some operation that actually should be cancelled whenever the component re-renders so after it updated so to say.
        //So you have an extra bit of flexibility that you have this cleanup function here that you can either let this()the cleanup function/return statement run when the component gets 
        //destroyed ([]) or it runs on every update cycle with no arguements or you pass a second argument which is an array that lists all the data that this should watch and only when that data changes it will run the useEffect and it'll then run the cleanup function too.
    });

    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    //NOT TAUGHT YET//
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red); //classes = ['red']
    }

    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold); //classes = ['red', 'bold']
    }

    return (
        //props (personsLength, title and showPersons) are used internally by cockpit and they'd trigger re-render of the cockpitn and NOT the persons array elements. The names of the persons and so on are totally irrelevant.
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working.</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
            {/* <AuthContext.Consumer>
                {context => <button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer> */}

            <button onClick={authContext.login}>Log in</button>

        </div>
    );
};

export default React.memo(cockpit); //Will only re-render when input to component changes. Uses memorization.

//One must have as many as functional stateless components(preseantational component-finctional stateless component that does not manage state) in his/her application. 
//By separating stateful and stateless components, you have a clear flow of data.
//You must have only a couple of stateful components in your application.
//Review videos 4 & 5


//VIDEO 16//When should you do Performance Optimization 
//If the child component is not affected by the changes in the parent component then you can apply the checks(shouldComponentUpdate and React.memo()) otherwise if you are sure that the child component ill update if the parent one updates then you shouldn't at these checks at all. It's useless to do so.