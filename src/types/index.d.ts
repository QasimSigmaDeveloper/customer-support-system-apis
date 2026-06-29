import { UserRole } from "../modules/user/user.interface";

declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string;
                role:UserRole;
            }
        }
    }
}
export {};