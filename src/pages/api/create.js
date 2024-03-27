import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { originalUrl } = req.body;
    const id = nanoid(8);

    try {
      const { data, error } = await supabase
        .from("urls")
        .insert([{ id, original_url: originalUrl }])
        .select();

      // console.log(data, error);

      if (error) {
        res.status(500).json({ error: "Failed to create short URL" });
      } else {
        const shortUrl = `${req.headers.host}/${data[0].id}`;
        res.status(200).json({ shortUrl });
      }
    } catch (error) {
      res.status(405).json({ error: error });
    }
  }
}
