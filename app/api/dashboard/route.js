import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pool = mysql.createPool({
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PWD,
    database: process.env.NEXT_DB_NAME
  });

  try {
    const connection = await pool.getConnection();
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
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error fetching totals' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}