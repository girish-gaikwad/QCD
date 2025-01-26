import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon, Check, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data: any; // Replace `any` with a specific type for `data`, depending on your use case
}
export function DatePickerWithRange({
  className,
  data,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);
  const [open, setOpen] = React.useState(false);
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    date?.from || new Date()
  );

  const updateDateRange = (newRange: DateRange | undefined) => {
    setTempDate(newRange);
    if (newRange?.from) {
      setCalendarMonth(newRange.from);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    // Set the temporary date to your state
    setDate(tempDate);
    console.log(tempDate)

    // Close the date picker or modal (if applicable)
    setOpen(false);

    try {
      // Wait for the POST request to complete
      const result = await axios.post(
        "http://localhost:5000/datewise", tempDate
      );

      // Log the response
      console.log(result,"result");
      data(result.data.data)
    } catch (error) {
      // Log any errors
      console.log("Error at post request", error);
    }
  };

  const handleCancel = () => {
    setTempDate(date);
    setOpen(false);
  };

  const QuickSelectButton = ({
    label,
    onClick,
  }: {
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
    >
      {label}
    </button>
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex max-h-[400px]">
            {/* Side Panel */}
            <div className="w-[160px] border-r border-gray-200">
              <div className="p-3 overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xs font-medium text-gray-900 mb-1.5">
                      Quick select
                    </h3>
                    <div className="space-y-0.5">
                      <QuickSelectButton
                        label="Last Week"
                        onClick={() =>
                          updateDateRange({
                            from: new Date(
                              new Date().setDate(new Date().getDate() - 7)
                            ),
                            to: new Date(),
                          })
                        }
                      />
                      <QuickSelectButton
                        label="Last 30 Days"
                        onClick={() =>
                          updateDateRange({
                            from: new Date(
                              new Date().setDate(new Date().getDate() - 30)
                            ),
                            to: new Date(),
                          })
                        }
                      />
                      <QuickSelectButton
                        label="Last 90 Days"
                        onClick={() =>
                          updateDateRange({
                            from: new Date(
                              new Date().setDate(new Date().getDate() - 90)
                            ),
                            to: new Date(),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-900 mb-1.5">
                      Date to now
                    </h3>
                    <div className="space-y-0.5">
                      <QuickSelectButton
                        label="Week to Date"
                        onClick={() => {
                          const startOfWeek = new Date();
                          startOfWeek.setDate(
                            startOfWeek.getDate() - startOfWeek.getDay()
                          );
                          updateDateRange({
                            from: startOfWeek,
                            to: new Date(),
                          });
                        }}
                      />
                      <QuickSelectButton
                        label="Month to Date"
                        onClick={() => {
                          const startOfMonth = new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1
                          );
                          updateDateRange({
                            from: startOfMonth,
                            to: new Date(),
                          });
                        }}
                      />
                      <QuickSelectButton
                        label="Quarter to Date"
                        onClick={() => {
                          const startOfQuarter = new Date(
                            new Date().getFullYear(),
                            Math.floor(new Date().getMonth() / 3) * 3,
                            1
                          );
                          updateDateRange({
                            from: startOfQuarter,
                            to: new Date(),
                          });
                        }}
                      />
                      <QuickSelectButton
                        label="Year to Date"
                        onClick={() => {
                          const startOfYear = new Date(
                            new Date().getFullYear(),
                            0,
                            1
                          );
                          updateDateRange({
                            from: startOfYear,
                            to: new Date(),
                          });
                        }}
                      />
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {/* BFCM Periods */}
                    <AccordionItem value="bfcm" className="border-none">
                      <AccordionTrigger className="text-xs py-1 hover:no-underline">
                        BFCM Periods
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-1">
                        <div className="space-y-0.5">
                          {[2024, 2023, 2022, 2021].map((year) => (
                            <QuickSelectButton
                              key={year}
                              label={`BFCM ${year}`}
                              onClick={() =>
                                updateDateRange({
                                  from: new Date(`${year}-11-29`),
                                  to: new Date(`${year}-12-02`),
                                })
                              }
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Quarters of 2024 */}
                    <AccordionItem value="quarters" className="border-none">
                      <AccordionTrigger className="text-xs py-1 hover:no-underline">
                        Quarters of 2024
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-1">
                        <div className="space-y-0.5">
                          {[
                            {
                              label: "Q1 2024",
                              from: "2024-01-01",
                              to: "2024-03-31",
                            },
                            {
                              label: "Q2 2024",
                              from: "2024-04-01",
                              to: "2024-06-30",
                            },
                            {
                              label: "Q3 2024",
                              from: "2024-07-01",
                              to: "2024-09-30",
                            },
                            {
                              label: "Q4 2024",
                              from: "2024-10-01",
                              to: "2024-12-31",
                            },
                          ].map((quarter) => (
                            <QuickSelectButton
                              key={quarter.label}
                              label={quarter.label}
                              onClick={() =>
                                updateDateRange({
                                  from: new Date(quarter.from),
                                  to: new Date(quarter.to),
                                })
                              }
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="flex flex-col">
              <div className="overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={calendarMonth}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  selected={tempDate}
                  onSelect={updateDateRange}
                  numberOfMonths={2}
                  className="p-3"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 px-3 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              className="h-8 px-3 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
