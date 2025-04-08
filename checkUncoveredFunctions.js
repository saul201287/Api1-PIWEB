const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const coverageFile = path.join(__dirname, "coverage", "coverage-final.json");
const outputJson = "uncovered-functions.json";
const outputExcel = "uncovered-functions.xlsx";

try {
  const coverageData = JSON.parse(fs.readFileSync(coverageFile, "utf8"));
  const uncoveredData = [];

  console.log("🔍 Funciones no cubiertas en los tests:\n");

  for (const [filePath, fileCoverage] of Object.entries(coverageData)) {
    const { f: functionHits, fnMap } = fileCoverage;

    const uncoveredFns = Object.entries(functionHits)
      .filter(([fnId, hits]) => hits === 0)
      .map(([fnId]) => {
        const fnInfo = fnMap[fnId];
        const entry = {
          file: filePath,
          functionName: fnInfo.name || "<anónima>",
          line: fnInfo.decl.start.line,
          column: fnInfo.decl.start.column,
        };
        uncoveredData.push(entry);
        return entry;
      });

    if (uncoveredFns.length > 0) {
      console.log(`📁 Archivo: ${filePath}`);
      uncoveredFns.forEach((fn) => {
        console.log(
          `  ❌ Función sin cubrir: ${fn.functionName} (Línea ${fn.line}, Columna ${fn.column})`
        );
      });
      console.log("");
    }
  }

  // Guardar JSON
  fs.writeFileSync(outputJson, JSON.stringify(uncoveredData, null, 2));
  console.log(`✅ Archivo JSON generado: ${outputJson}`);

  // Guardar Excel
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(uncoveredData);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Uncovered Functions");
  xlsx.writeFile(workbook, outputExcel);
  console.log(`✅ Archivo Excel generado: ${outputExcel}`);
} catch (error) {
  console.error("❌ Error leyendo el archivo de cobertura:", error.message);
}
