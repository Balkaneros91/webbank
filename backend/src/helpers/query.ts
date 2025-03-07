import { pool } from "../config/db";

export async function query<T>(sql: string, params: any[]) {
  const [result] = await pool.execute(sql, params);
  return result as T;
}
