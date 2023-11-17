const express = require("express");
const router = express.Router();
const db = require("./datverifConnection");

router.get("/", (req, res) => {
    db.query(
        "SELECT wallet, contractAddress, count, code FROM user ORDER BY id",
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

module.exports = router;
