import bcrypt from 'bcryptjs'

const users =[
    {
        name: 'Admin User',
        email:'admin@kjf.sa',
        password: bcrypt.hashSync('abc', 10),
        isAdmin: true
    },
    {
        name: 'Wafa User',
        email:'user@kjf.sa',
        password: bcrypt.hashSync('abc', 10),
    },
    {
        name: 'Imen',
        email:'user1@kjf.sa',
        password: bcrypt.hashSync('abc', 10),
    }
]

export default users