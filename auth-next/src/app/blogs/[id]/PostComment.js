"use server"
import dbConnect from "@/app/utils/dbConnect"
import Comment from "@/app/model/Comment"

export default async function postComment(commentStr, userNameStr, userEmailStr, userPicStr, blogIdStr){
    dbConnect()
    const comment = commentStr
    const userName = userNameStr
    const userEmail = userEmailStr
    const userPic = userPicStr
    const blogId = blogIdStr

    let newComment = new Comment({ comment, userName, userEmail, userPic, blogId })
    await newComment.save()
    console.log(newComment)
}