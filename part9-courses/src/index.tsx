import ReactDOM from 'react-dom/client'

interface WelcomeProps {
  name: string;
}

// The return type of functional component is JSX.Element
// however there is no need to define it explicitly
const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

// We have to use "as HTMLElement" assertion here 
// because getElementById() returns HTMLElement | null
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Welcome name="Sarah" />
)