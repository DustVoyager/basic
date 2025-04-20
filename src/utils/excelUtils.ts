import * as XLSX from "xlsx";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export const downloadChartAsExcel = (
  chartData: ChartData,
  fileName: string = "chart_data.xlsx"
) => {
  // 워크북 생성
  const wb = XLSX.utils.book_new();

  // 데이터를 Excel 형식으로 변환
  const data = [
    // 헤더 행
    ["", ...chartData.labels],
    // 데이터 행들
    ...chartData.datasets.map((dataset) => [dataset.label, ...dataset.data]),
  ];

  // 워크시트 생성
  const ws = XLSX.utils.aoa_to_sheet(data);

  // 워크시트를 워크북에 추가
  XLSX.utils.book_append_sheet(wb, ws, "Chart Data");

  // Excel 파일 다운로드
  XLSX.writeFile(wb, fileName);
};
