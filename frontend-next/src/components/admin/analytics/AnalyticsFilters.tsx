"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRangePicker } from "./DateRangePicker";
import { Button } from "@/components/ui/button";
import { FileDown, RefreshCw } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import { getAnalyticsSummary } from "@/lib/actions/analytics-actions";
import { exportToCSV, formatAnalyticsForCSV } from "@/lib/utils/export-csv";

export function AnalyticsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [exporting, setExporting] = useState(false);

  function handleDateRangeChange(range: DateRange | undefined) {
    setDateRange(range);
    if (range?.from && range?.to) {
      const days = Math.ceil(
        (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
      );
      const params = new URLSearchParams(searchParams);
      params.set("days", days.toString());
      router.push(`?${params.toString()}`);
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const days = dateRange?.from && dateRange?.to
        ? Math.ceil(
            (dateRange.to.getTime() - dateRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 30;

      const result = await getAnalyticsSummary(days);

      if (result.success && result.data) {
        const formatted = formatAnalyticsForCSV(result.data);

        // Export summary
        exportToCSV(
          formatted.summary,
          `analytics-summary-${format(new Date(), "yyyy-MM-dd")}`
        );

        // Export top pages
        if (formatted.topPages.length > 0) {
          setTimeout(() => {
            exportToCSV(
              formatted.topPages,
              `analytics-top-pages-${format(new Date(), "yyyy-MM-dd")}`
            );
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error exporting analytics:", error);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.refresh()}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={exporting}
          className="gap-2"
        >
          <FileDown className="h-4 w-4" />
          {exporting ? "Exportando..." : "Exportar CSV"}
        </Button>
      </div>
    </div>
  );
}
