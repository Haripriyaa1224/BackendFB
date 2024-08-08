# Api EndPoints

## To register user => POST /api/auth/register

#### Sample

<pre>{"username":"hari",
"fullName":"Harini",
"password":"Harini1",
"email":"hari@gmail.com"
}</pre>

## User

### To send friend request => POST /api/user/send

<pre>{
    "fromUserId":"66b3a3aa9076ffb29d95b269",
    "toUserId":"66b390fa7adf8a24a2ac1eae"
}</pre>

### To accept friend request => POST /api/user/accept
<pre>
{
    "userId":"66b390fa7adf8a24a2ac1eae",
    "fromUserId":"66b3a3aa9076ffb29d95b269"
}</pre>

### To reject friend reques => POST /api/post/reject

## Post

### To create post => POST api/posts/create-post

<pre>{
    "userId":"66b390fa7adf8a24a2ac1eae",
    "text": "This is my First Post",
}</pre>

### To create comment => POST api/posts/add-comment
<pre>{
    "userId":"66b390fa7adf8a24a2ac1eae",
    "postId":"66b447bb847592f443996253",
    "text": "This is my Second comment"
}</pre>


### To get the posts craeted by friends => GET api/posts/get-posts/:userId