const shortid = require("shortid");
const urlModel = require("../models/url.js");

async function generateShortId(req, res) {
    try {
        const { url } = req.body;

        // 🔹 1. Check if URL exists
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        // 🔹 2. Validate URL format
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ error: "Invalid URL format" });
        }
        const existsUrl = await urlModel.findOne({ redirectUrl: url });
        if (existsUrl) {
            return res.render("home", {
                idExists: true,
                shortId : existsUrl.shortId
            })
        }

        // 🔹 3. Generate shortId
        const shortId = shortid(8);

        // 🔹 4. Save to DB
        const newUrl = await urlModel.create({
            shortId: shortId,
            redirectUrl: url,
            visitHistory: []
        });

        // 🔹 5. Return shortened URL
        return res.render("home",
            {
                id: newUrl.shortId
            }
        );

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
}





async function redirectShortIdfromUI(req, res) {
    try {
        const shortId = req.query.shortId;

        const result = await urlModel.findOneAndUpdate(
            {
                shortId
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        if (!result) {
            return res.render("not found", {
                foundID: false
            });

            return res.json({ "massege": "url is not found you mf" });
        }

        return res.redirect(result.redirectUrl);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
}
async function redirectShortId(req, res) {
    try {
        const shortId = req.params.shortId;

        const result = await urlModel.findOneAndUpdate(
            {
                shortId
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        if (!result) {

            return res.json({ "massege": "url is not found you mf" });
        }

        return res.redirect(result.redirectUrl);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
}





async function deleteByUrl(req, res) {
    try {
        const { redirectUrl } = req.body;

        const deleted = await urlModel.findOneAndDelete({ redirectUrl });

        if (!deleted) {
            return res.render("not found");
        }

        return res.render("home", {
            deletedUrl: deleted
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }

}


module.exports = { generateShortId, redirectShortIdfromUI, redirectShortId, deleteByUrl };
