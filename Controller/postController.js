
const posts = require("../Data/postData");

// get all post
function getPost(req, res) {
    try {
        res.status(200).json({
            success: true,
            body: posts,
            message: "post Fetched successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong`,
            error: err.message,
        });
    }
}

// get single post

function getSinglePost(req, res) {
    try {
        let postId = req.params.id;
        let post = posts.find((ele) => ele.id === postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found with id ${postId}`,
            });
        }


        res.status(200).json({
            success: true,
            body: post,
            message: `Post Data Feched with id ${postId}`,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
}

// create Post

function createPost(req, res) {
    try {
        let { userId, title, body } = req.body;

        if (!userId || !title || !body) {
            return res.status(400).json({
                success: false,
                message: "Title and Content are Required Fields"
            })
        }

        let newPost = {
            ...req.body,
            id: String(Date.now())
        }

        posts.push(newPost)

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            body: newPost
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
}

// update Post

function updatePost(req, res) {
    try {
        let updateId = req.params.id;
        let index = posts.findIndex(ele => ele.id === updateId);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        let obj = posts.find(ele => ele.id === updateId);

        let updatedObj = {
            ...obj,
            ...req.body,
            id: obj.id
        }

        posts[index] = updatedObj;

        res.status(200).json({
            success: true,
            body: updatedObj,
            message: "Post Updated Successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network error",
            error: err.message
        })
    }
}

// Remove Post

function deletePost(req, res) {
    try {
        let removeId = req.params.id;
        let index = posts.findIndex((ele) => ele.id === removeId);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Post not found with id ${removeId}`,
            });
        }

        let postArr = posts.splice(index, 1);
        res.status(200).json({
            success: true,
            message: `Post Data Deleted successfully with id ${removeId}`,
            body: postArr[0],
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
}

module.exports = {
    getPost,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}

