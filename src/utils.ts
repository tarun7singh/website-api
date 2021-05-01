// import axios from "axios";
// import { execute } from "./database"
// const send = async (text: string) => {
//   const url =
//     "https://hooks.slack.com/services/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";
//   const options = {
//     text,
//   };
//   try {
//     let res = await axios.post(url, JSON.stringify(options));
//     if (res.status === 200) {
//       return { success: true };
//     } else {
//       console.error("error in sending message");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
// export async function readLast() {
//   try {
//     const lastRes: any = await execute("select * from pnp order by addedat desc limit 1")
//     return { success: true, data: lastRes[0] };
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
// }
// export async function writeLast(last: string) {
//   try {
//     await execute("insert into pnp (data) values ($1)", [last])
//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
// }
// export async function sendThese(data: any) {
//   await send("PNP update is here : \n" + data.join("\n"));
//   return { success: true };
// }
