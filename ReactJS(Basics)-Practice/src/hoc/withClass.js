import React from 'react';

const withClass = (WrappedComponent, className) => {
    return props => ( // props of WrappedComponent (in this case Person)
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;


//BEFORE// Functional component
// const withClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

// export default withClass;