import mysql from 'mysql2/promise';


export async function GET() {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'invoice'
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