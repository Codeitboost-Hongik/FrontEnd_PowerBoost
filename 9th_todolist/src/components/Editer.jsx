import { useRef, useState } from 'react';
import './Editer.css'

const Editer = ({onCreate}) => {

    const [content, setContent] = useState("");
    const contentRef = useRef();
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }

    const onSubmit = () => {
        if(content === ""){
            contentRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    }
return <div className="Editer">
<input 
ref={contentRef}
value={content}
onChange={onChangeContent}
onKeyDown={onKeyDown}
placeholder="새로운 todo..." />
<button onClick={onSubmit}>추가</button>
</div>
}

export default Editer;