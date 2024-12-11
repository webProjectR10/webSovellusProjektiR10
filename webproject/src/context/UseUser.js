import { useContext, useState } from 'react';
import { UserContext } from './UserContext';

export const useUser = () => {
  return useContext(UserContext);
};

// Remove setUser function from here