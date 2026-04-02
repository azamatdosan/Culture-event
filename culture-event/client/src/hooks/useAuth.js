import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Защита от использования хука вне AuthProvider
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  
  return context;
};