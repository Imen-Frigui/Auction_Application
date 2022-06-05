import jwt from 'jsonwebtoken'

const genrateToken = (id) => {
    return jwt.sign ({id},process.env.jwt_SECRET,
        {
    expiresIn: '30d'})
}

export default genrateToken