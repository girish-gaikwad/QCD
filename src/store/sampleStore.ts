import { create } from "zustand";
import { LineChart as LineChartIcon, BarChart2, PieChart } from "lucide-react";
const useSampleStore = create((set) => ({
  chartTypes: [
    { id: "bar", label: "Bar", icon: BarChart2 },
    { id: "line", label: "Line", icon: LineChartIcon },
    { id: "radial", label: "Radial", icon: PieChart },
  ],
  chartType: "bar",
  setChartType: (type) => set({ chartType: type }),
}));

export default useSampleStore;
