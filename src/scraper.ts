// src/scraper.ts
import axios from "axios";
import * as cheerio from "cheerio";

export interface Holiday {
  date: string;         // Formato: YYYY-MM-DD
  partial_date: string; // "18 de abril"
  month: string;        // "abril"
  motive: string;       // "Viernes Santo"
  kind: "all sectors";  // este campo lo setearíamos fijo, o lo definimos a futuro
}

export async function getHolidays(year: number = 2025): Promise<Holiday[]> {
  try {
    // 1. Hacemos la request a la página oficial
    const url = `https://www.gob.pe/feriados/61-dia-no-laborable-sector-publico`;
    // Aunque la URL real no se filtra por ?year=2025, lo dejamos como ejemplo, 
    // o simplemente: const url = "https://www.gob.pe/feriados";

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const holidays: Holiday[] = [];

    // 2. Buscamos todos los li.holidays__list-item
    const holidayItems = $(".holidays__list .holidays__list-item");

    holidayItems.each((_, el) => {
      // Cada LI tiene dos span.holidays__list-item-date y un span.holidays__list-item-name
      const spansDate = $(el).find("span.holidays__list-item-date");
      const name = $(el).find("span.holidays__list-item-name").text().trim();

      // spansDate eq(0): "Viernes 18 de "
      // spansDate eq(1): "abril: "

      const rawPart1 = $(spansDate[0]).text().trim(); // ej: "Viernes 18 de"
      const rawPart2 = $(spansDate[1]).text().trim(); // ej: "abril:"

      // Quitamos los ":" y procesamos
      // rawPart1 podría ser: "Viernes 18 de "
      // rawPart2 podría ser: "abril: "
      // Nos interesa quedarnos con "18", "abril", y "Viernes Santo"

      // Para obtener el día, podemos hacer un pequeño split:
      // "Viernes 18 de " => split(" ") => ["Viernes", "18", "de"]
      // day = 18
      const dayMatches = rawPart1.match(/(\d{1,2})/);
      const day = dayMatches ? dayMatches[1] : "1";

      // Para obtener el mes, 
      // rawPart2 => "abril: "
      // Remove ":" => "abril"
      const monthText = rawPart2.replace(":", "").trim();

      // Construimos partial_date => "18 de abril"
      const partial_date = `${day} de ${monthText}`;

      // Parseamos a YYYY-MM-DD => usaremos un mapa de meses
      const monthsMap: { [k: string]: string } = {
        "enero": "01",
        "febrero": "02",
        "marzo": "03",
        "abril": "04",
        "mayo": "05",
        "junio": "06",
        "julio": "07",
        "agosto": "08",
        "setiembre": "09",
        "septiembre": "09",
        "octubre": "10",
        "noviembre": "11",
        "diciembre": "12",
      };

      const monthNum = monthsMap[monthText.toLowerCase()] || "01";
      // Asumimos el año (por ejemplo 2025), 
      // para no complicarnos con "Viernes" / "Sábado", lo obviamos
      const isoDate = `${year}-${monthNum}-${day.padStart(2, "0")}`;

      // Por ahora, "kind" lo definimos como "all sectors".
      const holiday: Holiday = {
        date: isoDate,
        partial_date,
        month: monthText,
        motive: name,
        kind: "all sectors",
      };

      holidays.push(holiday);
    });

    return holidays;
  } catch (error) {
    console.error("Error al hacer scraping:", error);
    return [];
  }
}
