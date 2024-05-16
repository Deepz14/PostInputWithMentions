import { createContext, useContext, useState } from "react";

export const PostContext = createContext(null);

export const PostContextProvider = ({children}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [postData, setPostData] = useState([]);

    const onPostDataAdd = (data) => {
        setIsAdded(true);
        setPostData([...postData, {id: postData.length + 1, postInfo: data, createdOn: new Date(), PostedBy: "Deepak"}]);
    }

    return (
        <PostContext.Provider value={{isAdded, postData, onPostDataAdd}}>
            {children}
        </PostContext.Provider>
    )
}

export const UsePost = () => useContext(PostContext);