enum LegendPositions {
  RIGHT = "right",
  LEFT = "left",
  TOP = "top",
  BOTTOM = "bottom",
}

enum ScaleTypes {
  LABELS = "labels",
  LABELS_RATIO = "labels_ratio",
  LINEAR = "linear",
  LOG = "log",
  TIME = "time",
}

export enum ChartTheme {
  WHITE = "white",
  G100 = "g100",
  G90 = "g90",
  G10 = "g10",
}

export const donutGenderOptions = {
  title: "Patients by Gender",
  resizable: true,
  donut: {
    center: {
      label: "Total",
    },
  },
  height: "300px",
};

export const pieChartOptions = {
  title: "Patients by Nationality",
  resizable: true,
  height: "300px",
};

export const healthWorkersDisaggregationOptions = {
  title: "Health Workers Disaggregation",
  resizable: true,
  height: "300px",
};

export const dataEntryStatsOptions = {
  title: "Data Entry Statistics",
  legend: {
    position: LegendPositions.TOP,
  },
  axes: {
    left: {
      title: "Data Entrant / Provider",
      mapsTo: "key",
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      title: "Number of Entries",
      mapsTo: "value",
      scaleType: ScaleTypes.LINEAR,
    },
  },
  height: "600px",
  grid: {
    x: {
      enabled: true,
      numberOfTicks: 3,
    },
    y: {
      enabled: true,
      numberOfTicks: 6,
    },
  },
};

export const lineOptions = {
  title: "User Entry Statistics",
  axes: {
    bottom: {
      title: "User",
      mapsTo: "key",
      scaleType: ScaleTypes.LABELS,
    },
    left: {
      mapsTo: "value",
      title: "Number Of Entries",
      scaleType: ScaleTypes.LINEAR,
    },
  },
  height: "400px",
};

export const StackedBarPOCOptions = {
  title: "POC Service Points",
  axes: {
    bottom: {
      title: "Service Point",
      mapsTo: "key",
      scaleType: ScaleTypes.LABELS,
    },
    left: {
      mapsTo: "value",
      title: "Clients Served",
      scaleType: ScaleTypes.LINEAR,
    },
  },
  height: "500px",
};
