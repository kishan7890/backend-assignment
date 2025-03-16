import { useReducer } from 'react'

function App() {
  const reducer = (state,action)=>{
    switch (action.type) {
      case "INCREMENT_COUNT":
        return state + 1;
      case "DECREMENT_COUNT":
        if(state===0){
          return state;
        }
        return state - 1;
      default:
        throw new Error(`Action type is invalid`);
    }
  }

  const [state, dispatch] = useReducer(reducer,0)

  const handleIncrement = () => dispatch({ type: "INCREMENT_COUNT" });
  const handleDecrement = () => dispatch({ type: "DECREMENT_COUNT" });

  return (
    <>
     <h1>Counter: {state}</h1>
      <button onClick={handleIncrement}>INCREMENT</button>
      <button onClick={handleDecrement}>DECREMENT</button> 
    </>
  )
}

export default App
