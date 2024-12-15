// pages/api/add-product.js
import mysql from 'mysql2/promise';

export async function POST(req) {
  const { nom, num_tele, nbr_jrs, num_planche, date_sortie, date_rentre, prix_planche, prix_combine, prix_cours, note } = await req.json();

  // Validate input
  if (!nom || !num_tele || !nbr_jrs || !num_planche || !date_sortie || !date_rentre || !prix_planche || !prix_combine || !prix_cours || !note) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const pool = mysql.createPool({
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PWD,
    database: process.env.NEXT_DB_NAME
  });

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute('INSERT INTO `commandes`(`nom`, `num_tele`, `nbr_jrs`, `num_planche`, `date_sortie`, `date_rentre`, `prix_planche`, `prix_combine`, `prix_cours`, `note`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nom, num_tele, nbr_jrs, num_planche, date_sortie, date_rentre, prix_planche, prix_combine, prix_cours, note]);
    
    return new Response(JSON.stringify({ message: 'Product added successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message || 'Error adding product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    if (connection) connection.release(); // Ensure connection is released
  }
}

export async function GET(req) {
  const pool = mysql.createPool({
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PWD,
    database: process.env.NEXT_DB_NAME
  });

  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(`
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

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message || 'Error retrieving orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    if (connection) connection.release(); // Ensure connection is released
  }
}

