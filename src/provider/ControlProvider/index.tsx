import React, { createContext, ReactNode, useState } from 'react';

type ContextProps = {
  controlStatus: boolean;
  buttonIndex: number;
  setControlStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonIndex: React.Dispatch<React.SetStateAction<number>>;
};

type Props = {
  children: ReactNode;
};

export const ControlContext = createContext<ContextProps>({
  controlStatus: true,
  buttonIndex: 0,
  setButtonIndex: () => {},
  setControlStatus: () => {},
});

export const ControlProvider = ({ children }: Props) => {
  const [controlStatus, setControlStatus] = useState<boolean>(true);
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  return (
    <ControlContext.Provider
      value={{
        controlStatus,
        buttonIndex,
        setControlStatus,
        setButtonIndex,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};
