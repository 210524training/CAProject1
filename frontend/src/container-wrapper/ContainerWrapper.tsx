import React from 'react';
const ContainerWrapper = <P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> => {
  return (props) => (
    <div className="container">
      <Component {...props}>
        {/* Add some children */}
      </Component>
    </div>
  );
}

export default ContainerWrapper;