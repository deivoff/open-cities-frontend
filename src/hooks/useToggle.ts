import { useState } from 'react';

export default (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const handleToggle = () => setState(prevState => !prevState);

  return [state, handleToggle];
};
