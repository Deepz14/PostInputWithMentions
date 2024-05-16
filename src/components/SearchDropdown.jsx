import { forwardRef, useEffect, useRef, useState } from "react";
import { USERS } from "../helper/user";
import { Generate_Avatar_Colour, Generate_Avatar_Initial } from "../helper/generate_avatar";

const SearchDropdown = forwardRef(({onSearchSuggestion, onSelectedUser}, ref) => {
    const [searchInp, setSearchInp] = useState('');
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [suggestionList, setSuggestionList] = useState([]);
    const searchSuggestionRef = useRef(null);

    useEffect(() => {
        setSuggestionList(USERS);
    }, []);
    
    const onSearchInpChange = (e) => { 
        setSearchInp(e.target.value);
        const filterUsers = USERS.filter(user => user?.name.toLowerCase().includes(String(e.target.value).toLowerCase()));
        setSuggestionList(filterUsers);
    };

    const onSearchInpKeyDown = (e) => {
        if(e.key === "ArrowUp" && currentIndex >= 0){
            setCurrentIndex(currentIndex - 1);
        }else if(e.key === "ArrowDown"){
            searchSuggestionRef.current.focus();
            currentIndex < USERS.length ?  setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
        }else if(e.key === "Enter" && currentIndex < suggestionList.length){
            const selecteduser = suggestionList[currentIndex].name;
            onUserSelect(selecteduser);
        }else if(e.key === "Backspace"){
            setCurrentIndex(-1);
        }
    }

    const onUserSelect = (selectedUser) => {
        onSelectedUser(selectedUser);
        setSearchInp('');
        setCurrentIndex(-1);
    }

    
    const adjustScroll = () => {
        if(searchSuggestionRef.current && currentIndex !== -1 && (currentIndex >= suggestionList.length || currentIndex <= 2)){
            searchSuggestionRef.current.scrollTop = 0;
        }else if (searchSuggestionRef.current && currentIndex !== -1 && currentIndex < suggestionList.length) {
            const selectedItem = searchSuggestionRef.current.childNodes[currentIndex];
            const dropdownHeight = searchSuggestionRef.current.clientHeight;
            const selectedOffsetTop = selectedItem.offsetTop;
            const selectedHeight = selectedItem.offsetHeight;
        
            if (selectedOffsetTop < searchSuggestionRef.current.scrollTop) {
                searchSuggestionRef.current.scrollTop = selectedOffsetTop;
            } else if (selectedOffsetTop + selectedHeight > searchSuggestionRef.current.scrollTop + dropdownHeight) {
                searchSuggestionRef.current.scrollTop = selectedOffsetTop + selectedHeight - dropdownHeight;
            }
        }
      };
    
    useEffect(() => {
        adjustScroll();
    }, [currentIndex]);

    return (
        <div className="search-dropdown bg-white w-[45%] h-[250px] text-stone-950">
            <div className="input-search px-3">
                <input ref={ref} type="text" className="bg-white text-stone-950 border border-solid border-gray-300 w-full mt-2 p-1 rounded" 
                value={searchInp} onChange={onSearchInpChange} onKeyUp={onSearchSuggestion} onKeyDown={onSearchInpKeyDown} />
            </div>
            <div ref={searchSuggestionRef} className="suggestion-list h-full w-full bg-white pt-1">
                {
                    suggestionList.length > 0 ? 
                    (
                        suggestionList.map((user, index) => {
                            return (
                                <div onClick={() => onUserSelect(user?.name)} key={user?.id} className={`suggestion-item flex my-2 px-3 py-1 cursor-pointer
                                    ${currentIndex === index && 'bg-gray-100'}`}>
                                    <div className="avatar-container bg-green-400 rounded-full w-[38px] h-[38px] py-2 text-center"
                                    style={{ backgroundColor: Generate_Avatar_Colour(user?.name) }}>
                                        {Generate_Avatar_Initial(user?.name)}
                                    </div>
                                    <div className="suggestion-name ml-2 mt-2">
                                        {user?.name}
                                    </div>
                                </div>     
                            )
                        })
                    ) : <h4 className="text-sm pointer-events-none text-center">No records found</h4>
                } 
            </div>
        </div>
    );
});

export default SearchDropdown