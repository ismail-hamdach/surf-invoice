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
      `
      SELECT
        SUM(
            prix_planche + prix_combine + prix_cours
        ) AS total_sum,
        SUM(
            CASE WHEN DATE(created_at) = CURDATE() THEN prix_planche + prix_combine + prix_cours ELSE 0
            END) AS total_today,
        SUM(
            CASE WHEN MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE()) THEN prix_planche + prix_combine + prix_cours ELSE 0
            END) AS total_this_month,
            SUM(
                CASE WHEN YEAR(created_at) = YEAR(CURDATE()) THEN prix_planche + prix_combine + prix_cours ELSE 0
                END) AS total_this_year
        FROM
            commandes;
      `
    );
    const commandes = await connection.execute(`
      SELECT
          *
      FROM
          commandes
      WHERE
          DATE(created_at) = CURDATE()
      ORDER BY
          created_at
      DESC
          ;
      `);

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