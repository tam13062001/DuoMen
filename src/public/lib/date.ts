import { format } from "date-fns"

/**
 * ✅ Format ngày an toàn, không gây lỗi "Invalid time value"
 * Chấp nhận cả string, Date, null, undefined
 */
export function safeFormatDate(
  dateValue?: string | Date | null,
  formatStr: string = "yyyy-MM-dd"
): string {
  if (!dateValue) return "—"

  try {
    const date =
      typeof dateValue === "string"
        ? new Date(dateValue)
        : dateValue instanceof Date
        ? dateValue
        : null

    if (!date || isNaN(date.getTime())) return "—"

    return format(date, formatStr)
  } catch {
    return "—"
  }
}
