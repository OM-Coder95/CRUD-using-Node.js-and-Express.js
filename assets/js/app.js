const cl = console.log;

let posts = [
    {
        "userId": 1,
        "id": "1",
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": "2",
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": "3",
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
]

const express = require("express");

const port = 3000; // localhost:3000

const app = express();

app.use(express.json());

// fetching all post

app.get("/api/posts", (req, res) => {
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
});

// ************************************** //

// fetching single post
app.get("/api/posts/:id", (req, res) => {
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
});

// ************************************** //

// create Post

app.post("/api/posts", (req, res) => {
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
})

// ************************************** //

// deleting post

app.delete("/api/posts/:id", (req, res) => {
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
});

// update Post

app.patch("/api/posts/:id", (req, res) => {
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
})

app.listen(port, () => {
    cl("Successfully fetched Post Data");
});
