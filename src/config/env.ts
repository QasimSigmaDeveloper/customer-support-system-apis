import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT:process.env.PORT || 5000,
    DB_URL:process.env.DB_URL as string,
    JWT_MY_Secret:process.env.JWT_MY_Secret as string,
    JWT_REFRESH_Token:process.env.JWT_REFRESH_Token as string,
     JWT_ACCESS_EXPIRES_IN:process.env.JWT_ACCESS_EXPIRES_IN as string,
}