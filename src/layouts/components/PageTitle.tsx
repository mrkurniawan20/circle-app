import React, { useEffect } from 'react';

function PageTitle<AddProps extends {}>(Component: React.ComponentType<AddProps>, title: string) {
  return function WrappedComponent(props: AddProps) {
    useEffect(() => {
      document.title = title;
    }, []);
    return <Component {...props} />;
  };
}

export default PageTitle;
