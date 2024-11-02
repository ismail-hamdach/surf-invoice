// pages/api/add-product.js
import mysql from 'mysql2/promise';

export async function POST(req) {
  const { quantity, price } = await req.json();

  const pool = mysql.createPool({
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PWD,
    database: process.env.NEXT_DB_NAME
  });

  try {
    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO products (quantity, price) VALUES (?, ?)', [quantity, price]);
    const [rows] = await connection.execute(
      'SELECT SUM(quantity) as totalQuantity, SUM(quantity * price) as totalPrice FROM products'
    );
    const list = await connection.execute('SELECT * FROM products ORDER BY products.created_at DESC');
    connection.release();

    return new Response(JSON.stringify({
      totalQuantity: rows[0].totalQuantity || 0,
      totalPrice: rows[0].totalPrice || 0,
      data: list[0] || []
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error adding product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}