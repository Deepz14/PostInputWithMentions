import { UsePost } from "../context/PostContext";
import { Generate_Avatar_Initial, Time_Ago } from "../helper/generate_avatar";

const PostCard = () => {
    const { isAdded, postData } = UsePost();
    return (
        <div className="postcard-container w-[40%] mx-auto">
            {
                isAdded && postData?.length > 0 ?
                postData.map(post => {
                    return (
                        <div key={post?.id} className="postcard bg-zinc-300 w-full h-[150px] text-stone-950 rounded px-3 py-2">
                            <div className="postcard-msg">
                                {post?.postInfo}
                            </div>
                            <div className="postcard-footer border border-gray-400 border-t-1 border-r-0 border-b-0 border-l-0">
                                <div className="postedBy-item flex my-1">
                                    <div className="avatar-container bg-green-400 rounded-full w-[48px] h-[48px] text-center py-3 font-semibold">
                                        {Generate_Avatar_Initial(post?.PostedBy)}
                                    </div>
                                    <div className="postedBy-name ml-2">
                                    <h6 className="font-bold">{post?.PostedBy}</h6>
                                    <p className="text-sm text-slate-600">{Time_Ago(post?.createdOn)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                : ""
            }
        </div>
    )
}

export default PostCard;