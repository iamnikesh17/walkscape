const bcrypt=require("bcryptjs");

const users=[
    {
        name: "John Doe",
        email: "johndoe@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },{
        name: "Jane Smith",
        email: "janesmith@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },{
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    }
]

module.exports=users;