import React from 'react';

export interface FieldContextValue {
  id: string;
  errorId: string;
  descriptionId: string;
  hasError: boolean;
}

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export const useFieldContext = () => {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error('Field components must be used within a Field component');
  }
  return context;
};
