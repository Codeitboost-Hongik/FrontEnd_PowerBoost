import { useRef, useState } from "react";
import Editer from "./components/Editer";
import Header from "./components/Header";
import List from "./components/List";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
]

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(1);

  const onCreate = (content) => {
    const newTodo = {
      id : idRef.current++,
      isDone: false,
      content: content,
      date : new Date().getTime()
    }

    setTodos([newTodo, ...todos])
  }

  return (
    <div className="App">
      <Header />
      <Editer onCreate={onCreate} />
      <List todos={todos}/>
    </div>
  );
}
export default App;
