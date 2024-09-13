const express = require('express');
const router = express.Router();
const pool = require('../db');

// nambah kategori
// router.post('/addKategori', async (req, res) => {
//     try {
//         const { nama } = req.body;
        
//         // Periksa apakah kategori dengan nama yang sama sudah ada
//         const existingCategory = await pool.query(
//             "SELECT * FROM kategori WHERE nama = $1",
//             [nama]
//         );

//         if (existingCategory.rows.length > 0) {
//             return res.status(400).json({ error: "Kategori sudah ada" });
//         }

//         const result = await pool.query(
//             "INSERT INTO kategori (nama) VALUES ($1) RETURNING *",
//             [nama]
//         );
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.log('Error menambahkan kategori: ', err.message);
//         res.status(500).json({ error: err.message });
//     }
// });

// Update kategori
router.put('/updateKategori/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama } = req.body;

        // Cek apakah kategori dengan ID tersebut ada
        const categoryCheck = await pool.query(
            "SELECT * FROM kategori WHERE kategoriid = $1",
            [id]
        );

        if (categoryCheck.rows.length === 0) {
            return res.status(404).json({ error: "Kategori tidak ditemukan" });
        }

        // Jika ada, lanjutkan dengan pembaruan
        const result = await pool.query(
            "UPDATE kategori SET nama = $1 WHERE kategoriid = $2 RETURNING *",
            [nama, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating category:', err.message);
        res.status(500).json({ error: err.message });
    }
});


// Hapus kategori
router.delete('/deleteKategori/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM kategori WHERE kategoriid = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Kategori tidak ditemukan" });
        }

        res.json({ message: "Kategori berhasil dihapus" });
    } catch (err) {
        console.error('Error deleting category:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ambil semua kategori
router.get('/getKategori', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM kategori");
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching categories:', err.message);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router