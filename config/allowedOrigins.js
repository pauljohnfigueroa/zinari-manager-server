import dotenv from 'dotenv'
dotenv.config()
// Do not forget to remove the trailing slash
const allowedOrigins = [process.env.CLIENT_APP]

export default allowedOrigins
