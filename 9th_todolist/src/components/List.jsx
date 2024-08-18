import { useState } from 'react'
import './List.css'
import TodoItem from './TodoItem'
const List = ({todos}) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilterData = () => {
        if(search === ""){
            return todos;
        }
        return todos.filter((todos) => 
        todos.content.toLowerCase().includes(search.toLocaleLowerCase()))
    }

    const filterTodos = getFilterData();

    return <div className='List'>
        <h4>Todo List ✅</h4>
        <input onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
        <div className='todos_wrapper'>
            {filterTodos.map((todo)=> {
                return <TodoItem key={todo.id} {...todo} /> 
            })
            }
        </div>
    </div> 
}

export default List 