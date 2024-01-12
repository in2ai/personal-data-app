import { connectDatabase } from "../api/db";
export { printDatabase };

const printDatabase = async () => {
  try {
    const db = await connectDatabase();
    const query = {
      sql: "select * from person",
      args: [],
    };
    const [result] = await db.execAsync([query], false);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
