const express = require("express");
const router = express.Router();
const db = require("./dbConnection");

// Get all collections
router.get("/", (req, res) => {
    db.query(
        "SELECT collections.*, COUNT(likes.id) AS total_likes FROM collections LEFT JOIN likes ON collections.id = likes.collection_id GROUP BY collections.collection_id",
        (err, results) => {
            if (err) {
                console.error("Error executing MySQL query:", err);
                res.status(500).send("Error executing MySQL query.");
                return;
            }
            res.send(results);
        }
    );
});

router.get("/:collectionId", (req, res) => {
    const { collectionId } = req.params;
    db.query(
        "SELECT collections.*, COUNT(likes.id) AS total_likes FROM collections LEFT JOIN likes ON collections.id = likes.collection_id WHERE collections.id = ? GROUP BY collections.id",
        [collectionId],
        (err, results) => {
            if (err) {
                console.error("Error executing MySQL query:", err);
                res.status(500).send("Error executing MySQL query.");
                return;
            }
            res.send(results[0]);
        }
    );
});

module.exports = router;
