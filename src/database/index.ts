// import { Pool } from "pg";
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   }
// });

// pool.on("error", (err, client) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

// export async function execute(query: string, queryParams: any[] = []) {
//   const client = await pool.connect();
//   try {
//     const res = await client.query(query, queryParams);
//     if (res.rows) {
//       return res.rows;
//     } else {
//       res;
//     }
//   } catch (error) {
//     console.log(error);
//     return;
//   }
//    finally {
//     client.release();
//   }
// }
