// src/index.ts
import express from "express";
import { getHolidays } from "./scraper";

const app = express();
const PORT = process.env.PORT || 3000;

// Ej: GET /api/all?year=2025
app.get("/api/all", async (req, res) => {
  try {
    const yearParam = req.query.year ? parseInt(req.query.year as string, 10) : 2025;
    const holidays = await getHolidays(yearParam);
    return res.json({ success: "ok", value: holidays });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: "error",
      message: "No se pudo obtener la información de feriados"
    });
  }
});

// Ej: GET /api/holiday/2025-04-18
app.get("/api/holiday/:date", async (req, res) => {
  try {
    const date = req.params.date; // "2025-04-18"
    const yearParam = req.query.year ? parseInt(req.query.year as string, 10) : 2025;
    const holidays = await getHolidays(yearParam);

    const holidayFound = holidays.find((h) => h.date === date);
    if (!holidayFound) {
      return res.json({
        success: "error",
        message: `No se encontró feriado para la fecha ${date}`
      });
    }

    return res.json({
      success: "ok",
      value: holidayFound
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: "error",
      message: "No se pudo obtener la información de feriados"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
