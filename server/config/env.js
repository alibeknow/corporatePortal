import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ silent: true, path: path.resolve(process.cwd(), '.env.example') })