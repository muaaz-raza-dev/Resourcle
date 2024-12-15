import bcrypt from "bcryptjs"
export function isValidPassword(password:string,hashed_password:string){
    return bcrypt.compareSync(password, hashed_password);
}