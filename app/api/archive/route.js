import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Retrieve start_date and end_date from URL parameters
  const url = new URL(request.url);
  const start_date = url.searchParams.get('start_date');
  const end_date = url.searchParams.get('end_date');

  const pool = mysql.createPool({
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PWD,
    database: process.env.NEXT_DB_NAME
  });

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `
      SELECT
       
        SUM(
            CASE WHEN DATE(created_at) BETWEEN ? AND ? THEN prix_planche + prix_combine + prix_cours ELSE 0
            END) AS total
        FROM
            commandes;
      `, [start_date, end_date]
    );
    const commandes = await connection.execute(`
      SELECT
          *
      FROM
          commandes
      WHERE
          DATE(created_at) BETWEEN ? AND ?
      ORDER BY
          created_at
      DESC
          ;
      `, [start_date, end_date]);

    connection.release();

    return new Response(JSON.stringify({
      total_sum: rows[0].total_sum || 0,
      total_today: rows[0].total_today || 0,
      total_this_month: rows[0].total_this_month || 0,
      total_this_year: rows[0].total_this_year || 0 ,
      commandes: commandes[0] || []
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