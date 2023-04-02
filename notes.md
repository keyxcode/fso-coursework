# Components

- Never define components inside of another component
- A state update in React happens asynchronously, i.e. not immediately but "at some point" before the component is rendered again

# States

- We must never mutate states directly in React

# Hooks

- useState() as well as the useEffect() must not be called from inside of:
  - a loop
  - a conditional expression
  - any place that is not a function defining a component
- This ensures that the hooks are always called in the same order

# Rendering collections

- Each item must have a key. It's not recommended to use array index as keys