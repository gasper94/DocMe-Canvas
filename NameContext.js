// NameContext.js
import React, { createContext, useState } from 'react';

export const NameContext = createContext({
  name: '',
  setName: () => {},
});

export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};
