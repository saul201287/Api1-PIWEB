const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

const resultsFile = "results.json";
const coverageFile = "coverage/coverage-final.json";

try {
  const rawData = fs.readFileSync(resultsFile, "utf8");
  const testResults = JSON.parse(rawData);

  const coverageData = JSON.parse(fs.readFileSync(coverageFile, "utf8"));

  console.log(
    `Total de archivos en coverage: ${Object.keys(coverageData).length}`
  );

  const safePct = (section) =>
    section && typeof section.pct === "number" ? section.pct : "N/A";

  console.log("Algunas rutas disponibles en coverage:");
  Object.keys(coverageData)
    .slice(0, 5)
    .forEach((key) => console.log(`- ${key}`));

  const dataset = testResults.testResults.map((test) => {
    const suiteName = test.name.split("\\").pop().split("/").pop();

    let baseFileName = suiteName
      .replace(".test.ts", "")
      .replace(".test.js", "");

    let matchedFile = null;

    matchedFile = Object.keys(coverageData).find((filePath) => {
      return path.basename(filePath).includes(baseFileName);
    });

    if (!matchedFile) {
      matchedFile = Object.keys(coverageData).find((filePath) => {
        return (
          filePath.includes(`/${baseFileName}.`) ||
          filePath.includes(`\\${baseFileName}.`)
        );
      });
    }

    if (!matchedFile && baseFileName === "PutUserController") {
      matchedFile = Object.keys(coverageData).find((filePath) => {
        return (
          filePath.includes("PutUserPass") && !filePath.includes("Recover")
        );
      });

      if (matchedFile) {
        console.log(
          `Coincidencia especial para PutUserController: ${matchedFile}`
        );
      }
    }

    if (!matchedFile) {
      console.log(
        `No se encontró coincidencia para: ${suiteName} (base: ${baseFileName})`
      );
      console.log("Posibles rutas similares:");
      Object.keys(coverageData)
        .filter((path) =>
          path.toLowerCase().includes(baseFileName.toLowerCase())
        )
        .slice(0, 3)
        .forEach((p) => console.log(`  - ${p}`));
    } else {
      console.log(`Coincidencia encontrada: ${suiteName} → ${matchedFile}`);
    }

    const coverage = matchedFile ? coverageData[matchedFile] : null;

    return {
      suite: suiteName,
      assertionCount: test.assertionResults.length,
      passed: test.assertionResults.filter((a) => a.status === "passed").length,
      failed: test.assertionResults.filter((a) => a.status === "failed").length,
      duration: test.assertionResults.reduce(
        (sum, a) => sum + (a.duration || 0),
        0
      ),
      timestamp: new Date(test.startTime || Date.now()).toLocaleString(),
      statementsCoverage: safePct(coverage?.statements),
      linesCoverage: safePct(coverage?.lines),
      functionsCoverage: safePct(coverage?.functions),
      branchesCoverage: safePct(coverage?.branches),
    };
  });

  fs.writeFileSync("dataset.json", JSON.stringify(dataset, null, 2));
  console.log("✅ Dataset JSON generado con éxito: dataset.json");

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(dataset);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Test Results");
  xlsx.writeFile(workbook, "dataset.xlsx");

  console.log("✅ Archivo Excel generado con éxito: dataset.xlsx");
} catch (error) {
  console.error("❌ Error procesando el dataset:", error.message);
}
