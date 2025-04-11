// // blog controller
// import { Hono } from "hono";
// import { Context } from "hono/jsx";
// // view by id
// export const GetbyID = async (c: Context) => {
//   try {
//     const id = c.req.param("id");
//     // your logic here
//     return c.json({ message: `Blog with id: ${id}` });
//   } catch (error) {
//     console.error(error);
//     return c.json({ message: "Error fetching blog by ID" }, 500);
//   }
// };
