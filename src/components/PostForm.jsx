import { useState, useRef } from "react";
import { useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
import { UsePost } from "../context/PostContext";
import { Generate_Avatar_Colour } from "../helper/generate_avatar";

const PostForm = () => {
    const [text, setText] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const textareaRef = useRef(null);
    const searchInpRef = useRef(null);
    const { onPostDataAdd } = UsePost();

    useEffect(() => {
        if(showSearchDropdown){
            searchInpRef.current.focus();
        }
    }, [showSearchDropdown]);

    const onTextChangeHandler = (e) => setText(e.target.value);
    const onCheckMentionHandler = (e) => {
        if(e.keyCode === 50 && e.key === "@"){
            setShowSearchDropdown(true);
            textareaRef.current.blur();                
        }
    }

    const onSearchSuggestion = (e) => {
        if(e.target.value.length < 1 && e.keyCode === 8){
            if(searchInpRef.current){
                searchInpRef.current.blur();
                textareaRef.current.focus();
            }
            const updateText = text.includes("@") ? text.replace("@", "") : "";
            setText(updateText);
            setShowSearchDropdown(false);
        }
    }

    const onAddPost = (e) => {
        e.preventDefault();
        onPostDataAdd(text);
        setText('');
    }

    const onSelectedUser = (selectedUser) => {
        const updateText = text.includes("@") ? `${text.replace("@", "")} ${selectedUser}` : "";
        setText(updateText);
        setShowSearchDropdown(false);
    }

    return (
        <div>
            <div className="container w-[40%] mx-auto mt-8">
                <form onSubmit={onAddPost}>
                    <textarea ref={textareaRef} className="w-full p-4 bg-zinc-300 text-stone-950 font-semibold rounded outline-none" placeholder="Create a post ..."
                        value={text} onChange={onTextChangeHandler} onKeyUp={onCheckMentionHandler} >
                    </textarea>
                    <button type="submit" className="px-8 py-1 bg-fuchsia-600 text-stone-950 font-semibold rounded float-right">Post</button>
                </form>
                {
                    showSearchDropdown &&
                    (
                        <SearchDropdown onSearchSuggestion={onSearchSuggestion} onSelectedUser={onSelectedUser} ref={searchInpRef} />
                    )
                }
            </div>
        </div>
    )
}

export default PostForm;