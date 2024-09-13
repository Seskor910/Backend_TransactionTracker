const express = require('express');
const router = express.Router();
const pool = require('../db');

// add transaksi baru
router.post('/addTransaksi', async (req, res) => {
    try {
        const { kategoriid, jumlah, keterangan } = req.body;

        // Validasi input
        if (!kategoriid || !jumlah) {
            return res.status(400).json({ error: "Kategori ID dan Jumlah harus diisi" });
        }

        const result = await pool.query(
            "INSERT INTO transaksi (kategoriid, jumlah, keterangan) VALUES ($1, $2, $3) RETURNING *",
            [kategoriid, jumlah, keterangan]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.log('Error menambahkan transaksi: ', err.message);
        res.status(500).json({ error: err.message });
    }
});

// update transaksi
router.put('/updateTransaksi', async (req, res) => {
    try {
        const { keterangan, kategoriid, jumlah, newKeterangan } = req.body;

        // Periksa apakah kategoriid valid
        const validCategory = await pool.query(
            "SELECT * FROM kategori WHERE kategoriid = $1",
            [kategoriid]
        );

        if (validCategory.rows.length === 0) {
            return res.status(400).json({ error: "Kategori tidak valid" });
        }

        // Periksa apakah transaksi dengan keterangan yang diberikan ada
        const transaksiCheck = await pool.query(
            "SELECT * FROM transaksi WHERE keterangan = $1",
            [keterangan]
        );

        if (transaksiCheck.rows.length === 0) {
            return res.status(404).json({ error: "Transaksi tidak ditemukan" });
        }

        // Update transaksi
        const updateTransaksi = await pool.query(
            "UPDATE transaksi SET kategoriid = $1, jumlah = $2, keterangan = $3 WHERE keterangan = $4 RETURNING *",
            [kategoriid, jumlah, newKeterangan || keterangan, keterangan]
        );

        if (updateTransaksi.rows.length === 0) {
            return res.status(404).json({ error: "Transaksi tidak diperbarui" });
        }

        res.json(updateTransaksi.rows[0]);
    } catch (err) {
        console.error('Error updating transaction:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ngapus transaksi
router.delete('/deleteTransaksi', async (req, res) => {
    try {
        const { keterangan } = req.body;

        // Periksa apakah transaksi dengan keterangan yang diberikan ada
        const transaksiCheck = await pool.query(
            "SELECT * FROM transaksi WHERE keterangan = $1",
            [keterangan]
        );

        if (transaksiCheck.rows.length === 0) {
            return res.status(404).json({ error: "Transaksi tidak ditemukan" });
        }

        await pool.query("DELETE FROM transaksi WHERE keterangan = $1", [keterangan]);
        res.json({ message: "Transaksi berhasil dihapus" });
    } catch (err) {
        console.error('Error deleting transaction:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ambil data dan filter berdasarkan kategori
router.get('/getTransaksi', async (req, res) => {
    const kategoriid = req.query.kategoriid;

    let query = "SELECT * FROM transaksi";
    const params = [];

    if (kategoriid) {
        query += " WHERE kategoriid = $1";
        params.push(kategoriid);
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error saat mengambil data transaksi: ', err.message);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

