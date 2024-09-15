import { useState } from 'react';

const withAuth =
  (Component1: React.ComponentType<any>, requiredPermission: boolean) => (props: any) => {
    if (requiredPermission) {
      return null;
    }
    return <Component1 {...props} />;
  };

const Button: React.FC<{ text: string }> = ({ text, ...props }) => (
  <button style={{ color: 'red' }} {...props}>
    {text}
  </button>
);

const About = () => {
  const [state, setState] = useState(0);
  const ButtonWithPermission = withAuth(Button, true);
  const ButtonWithoutPermission = withAuth(Button, false);
  console.log('ButtonWithPermission: ', ButtonWithPermission);

  const handleClick = () => setState((state) => state + 1);

  return (
    <>
      <span onClick={() => setState(state + 1)}>About {state}</span>
      <ButtonWithPermission text='About' />
      <ButtonWithoutPermission text='About' onClick={handleClick} />
    </>
  );
};

export default About;
