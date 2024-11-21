import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve("./checkinData.json");

  if (req.method === "GET") {
 
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return res.status(200).json(JSON.parse(data));
    } else {
      return res.status(200).json({});
    }
  }

  if (req.method === "POST") {
   
    const { checkInStatus } = req.body;

    try {
      fs.writeFileSync(filePath, JSON.stringify(checkInStatus, null, 2));
      return res.status(200).json({ message: "Check-in data saved!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to save data." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
