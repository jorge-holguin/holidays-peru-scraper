
# Feriados Perú Scraper

Proyecto que hace scraping de la página de feriados nacionales de Perú, y expone una API con los datos en formato JSON. Está escrito en TypeScript y utiliza Express, Axios y Cheerio.

## Características
- **Scraping** de la página [https://www.gob.pe/feriados](https://www.gob.pe/feriados).
- **Endpoints**:
  - `GET /api/all`: Devuelve todos los feriados en JSON.
  - `GET /api/holiday/:date`: Devuelve el feriado correspondiente a la fecha `YYYY-MM-DD`.
- **TypeScript** para un desarrollo tipado y organizado.
- **Express** como servidor web.

## Requisitos
- Node.js (versión 14 o superior).
- npm o yarn para manejar dependencias.

## Instalación
Clonar este repositorio:
```bash
git clone https://github.com/tu-usuario/feriados-peru-scraper.git
cd feriados-peru-scraper
```

Instalar dependencias:
```bash
npm install
# o
yarn
```

Compilar (opcional, si vas a correr con `npm run start`):
```bash
npm run build
```

## Uso en Desarrollo
Para ejecutar en modo desarrollo (usando ts-node y recargando cambios):
```bash
npm run dev
```
Esto iniciará el servidor en [http://localhost:3000](http://localhost:3000).

## Uso en Producción
Compila el proyecto TypeScript:
```bash
npm run build
```
Ejecuta el código compilado:
```bash
npm run start
```
El servidor correrá en [http://localhost:3000](http://localhost:3000).

## Endpoints
### `GET /api/all`

**Descripción:** Retorna todos los feriados en un arreglo.

**Ejemplo de Respuesta:**
```json
{
  "success": "ok",
  "value": [
    {
      "date": "2025-04-18",
      "partial_date": "18 de abril",
      "month": "abril",
      "motive": "Viernes Santo",
      "kind": "all sectors"
    }
  ]
}
```

### `GET /api/holiday/:date`

**Descripción:** Retorna la información del feriado para la fecha dada (formato `YYYY-MM-DD`).

**Ejemplo:**
```bash
GET /api/holiday/2025-04-18
```

**Ejemplo de Respuesta:**
```json
{
  "success": "ok",
  "value": {
    "date": "2025-04-18",
    "partial_date": "18 de abril",
    "month": "abril",
    "motive": "Viernes Santo",
    "kind": "all sectors"
  }
}
```

Si no existe feriado para esa fecha, la respuesta será:
```json
{
  "success": "error",
  "message": "No se encontró feriado para la fecha 2025-04-18"
}
```

## Contribuir
1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/algo-nuevo`).
3. Commitéa tus cambios (`git commit -m 'Agregué algo nuevo'`).
4. Haz push a tu fork (`git push origin feature/algo-nuevo`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT. ¡Eres libre de usarlo y modificarlo!

## Autor
Tu Nombre (@tu-usuario)

## Despliegue en Render
1. Crea una cuenta en Render.com (o inicia sesión con GitHub).
2. Crea un nuevo servicio web (“New Web Service”).
3. Elige tu repositorio (`feriados-peru-scraper`).
4. En **Build Command** pon:
    ```bash
    npm install
    npm run build
    ```
5. En **Start Command** pon:
    ```bash
    npm run start
    ```
6. Haz clic en **Create Web Service** y espera a que termine de compilar.
7. Render te dará una URL pública donde estará corriendo tu API.
