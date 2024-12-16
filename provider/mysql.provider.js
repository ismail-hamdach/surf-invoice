import mysql from 'mysql2/promise'

export const createPool = () => {
    return mysql.createPool({
        host: "172.105.70.171",
        user: "omarhaya_surf_man_user",
        password: "#y7Az42f^!;.",
        database: "omarhaya_surf_man_db",
        port: "3306"
    });
}