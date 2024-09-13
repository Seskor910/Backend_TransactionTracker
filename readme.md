# Database Schema

## Tabel: `transaksi`

| Kolom        | Tipe Data | Deskripsi                   |
|---------------|-----------|-----------------------------|
| `id`          | INTEGER   | Kunci utama, auto increment |
| `kategoriid`  | INTEGER   | ID kategori                  |
| `jumlah`      | NUMERIC   | Jumlah transaksi             |
| `keterangan`  | VARCHAR   | Deskripsi transaksi          |

## Tabel: `kategori`

| Kolom        | Tipe Data | Deskripsi                   |
|---------------|-----------|-----------------------------|
| `kategoriid`  | INTEGER   | Kunci utama, auto increment |
| `nama`        | VARCHAR   | Nama kategori               |

## Relasi

- **transaksi.kategoriid** → **kategori.kategoriid** (One-to-Many)



# API Documentation

## Overview

This API provides endpoints to manage transactions, including creating, updating, deleting, and retrieving transactions. 

---

## Endpoints

### 1. Add Transaction

- **URL**: `/api/addTransaksi`
- **Method**: `POST`
- **Description**: Add a new transaction to the system.

#### Request Body

```json
{
  "kategoriid": "integer",
  "jumlah": "number",
  "keterangan": "string"
}
```

- **kategoriid**: The ID of the category for the transaction (required).
- **jumlah**: The amount of the transaction (required).
- **keterangan**: Description of the transaction (optional).

#### Response

- **Success**: Returns the newly added transaction.

```json
{
  "id": "integer",
  "kategoriid": "integer",
  "jumlah": "number",
  "keterangan": "string"
}
```

- **Error**: 
  - `400 Bad Request`: If `kategoriid` or `jumlah` is missing.
  - `500 Internal Server Error`: For other server errors.

---

### 2. Update Transaction

- **URL**: `/api/updateTransaksi`
- **Method**: `PUT`
- **Description**: Update an existing transaction based on its description.

#### Request Body

```json
{
  "keterangan": "string",
  "kategoriid": "integer",
  "jumlah": "number",
  "newKeterangan": "string"
}
```

- **keterangan**: The current description of the transaction to be updated (required).
- **kategoriid**: The new category ID for the transaction (required).
- **jumlah**: The new amount for the transaction (optional).
- **newKeterangan**: The new description for the transaction (optional).

#### Response

- **Success**: Returns the updated transaction.

```json
{
  "id": "integer",
  "kategoriid": "integer",
  "jumlah": "number",
  "keterangan": "string"
}
```

- **Error**: 
  - `400 Bad Request`: If `kategoriid` is invalid.
  - `404 Not Found`: If the transaction with the provided description is not found.
  - `500 Internal Server Error`: For other server errors.

---

### 3. Delete Transaction

- **URL**: `/api/deleteTransaksi`
- **Method**: `DELETE`
- **Description**: Delete a transaction based on its description.

#### Request Body

```json
{
  "keterangan": "string"
}
```

- **keterangan**: The description of the transaction to be deleted (required).

#### Response

- **Success**: Returns a confirmation message.

```json
{
  "message": "Transaksi berhasil dihapus"
}
```

- **Error**: 
  - `404 Not Found`: If the transaction with the provided description is not found.
  - `500 Internal Server Error`: For other server errors.

---

### 4. Get Transactions

- **URL**: `/api/getTransaksi`
- **Method**: `GET`
- **Description**: Retrieve a list of transactions, optionally filtered by category.

#### Query Parameters

- **kategoriid**: Filter transactions by category ID (optional).

#### Response

- **Success**: Returns a list of transactions.

```json
[
  {
    "id": "integer",
    "kategoriid": "integer",
    "jumlah": "number",
    "keterangan": "string"
  }
]
```

- **Error**: 
  - `500 Internal Server Error`: For server errors.

---

## Example Usage

### Add Transaction

**Request:**

```http
POST /api/addTransaksi
Content-Type: application/json

{
  "kategoriid": 1,
  "jumlah": 100.00,
  "keterangan": "Salary"
}
```

**Response:**

```json
{
  "id": 1,
  "kategoriid": 1,
  "jumlah": 100.00,
  "keterangan": "Salary"
}
```

### Update Transaction

**Request:**

```http
PUT /api/updateTransaksi
Content-Type: application/json

{
  "keterangan": "Old Description",
  "kategoriid": 2,
  "jumlah": 150.00,
  "newKeterangan": "Updated Description"
}
```

**Response:**

```json
{
  "id": 1,
  "kategoriid": 2,
  "jumlah": 150.00,
  "keterangan": "Updated Description"
}
```

### Delete Transaction

**Request:**

```http
DELETE /api/deleteTransaksi
Content-Type: application/json

{
  "keterangan": "Description to Delete"
}
```

**Response:**

```json
{
  "message": "Transaksi berhasil dihapus"
}
```

### Get Transactions

**Request:**

```http
GET /api/getTransaksi?kategoriid=1
```

**Response:**

```json
[
  {
    "id": 1,
    "kategoriid": 1,
    "jumlah": 100.00,
    "keterangan": "Salary"
  }
]
```

---

## Notes

- Ensure that all required fields are provided in the request body for `POST` and `PUT` methods.
- Use the appropriate status codes to handle errors and responses.
- Adjust the API base URL (`http://localhost:3000/api`) as needed depending on your environment.

---
