/**
 * Export data to CSV file
 */
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) {
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(","),
    // Data rows
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values with commas or quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format analytics data for CSV export
 */
export function formatAnalyticsForCSV(data: {
  totalPageViews: number;
  uniqueVisitors: number;
  conversions: number;
  topPages: Array<{ path: string; views: number }>;
}) {
  return {
    summary: [
      {
        Métrica: "Total de Visualizações",
        Valor: data.totalPageViews,
      },
      {
        Métrica: "Visitantes Únicos",
        Valor: data.uniqueVisitors,
      },
      {
        Métrica: "Conversões",
        Valor: data.conversions,
      },
      {
        Métrica: "Taxa de Conversão",
        Valor:
          data.totalPageViews > 0
            ? `${((data.conversions / data.totalPageViews) * 100).toFixed(2)}%`
            : "0%",
      },
    ],
    topPages: data.topPages.map((page) => ({
      Página: page.path,
      Visualizações: page.views,
    })),
  };
}
