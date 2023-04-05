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

# Effect Hooks

- In React, side effects are not predictable because they are actions which are performed with the "outside world." We perform a side effect when we need to reach outside of our React components to do something. Performing a side effect, however, will not give us a predictable result.
- Think about if we were to request data (like blog posts) from a server that has failed and instead of our post data, gives us a 500 status code response.
- The Effect Hook lets you perform side effects on function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
- The effect hook function takes 2 arguments, a callback (the effect itself) and an array:
  - The callback will be called _after_ the component renders. In this function, we can perform our side effects or multiple side effects if we want.
  - The second argument is an array, called the dependencies array. What this array will do is it will check and see if a value (in this case name) has changed between renders. If so, it will execute our use effect function again. Passing an empty array [] means the effect will run only once when the component has rendered the first time.

# Rendering collections

- Each item must have a key. It's not recommended to use array index as keys

# Promise

- A promise is an object that represents an asynchronous operation. A promise can have three distinct states:

  1. The promise is pending: It means that the final value (one of the following two) is not available yet.
  2. The promise is fulfilled: It means that the operation has been completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.
  3. The promise is rejected: It means that an error prevented the final value from being determined, which generally represents a failed operation.

# REST

- In REST terminology, we refer to individual data objects as _resources_
- Every resource has a unique address associated with it - its URL
- Resources are fetched from the server with HTTP GET requests
- Creating a new resource is done by making an HTTP POST request to the resource URL according to the REST convention

# Thinking in React

- Create individual components that are as independent and reusable as possible => HTML, CSS, JS all in one component

# npm

- It's customary to run tasks as npm scripts
