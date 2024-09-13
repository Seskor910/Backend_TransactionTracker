const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const modifTransaksiRoutes = require('./routes/modifTransaksi');
const ngelolaKategoriRoutes = require('./routes/ngelolaKategori');

app.use(cors());
app.use(express.json());

app.use('/api', modifTransaksiRoutes);
app.use('/api', ngelolaKategoriRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});