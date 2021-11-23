import { useSelector } from "react-redux";
function Process() {
  // returns new state from the reducers
  const state = useSelector((state) => state.ProcessReducer);

  return (
    <div className="process">
      
    </div>
  );
}
export default Process;