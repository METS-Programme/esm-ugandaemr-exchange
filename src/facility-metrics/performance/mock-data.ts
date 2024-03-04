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

export const donutGenderData = [
  {
    group: "Male",
    value: 11251,
  },
  {
    group: "Female",
    value: 17955,
  },
];

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

export const donutDepartmentData = [
  {
    group: "Refugee",
    value: 5,
  },
  {
    group: "National",
    value: 15,
  },
  {
    group: "Foreigner",
    value: 6,
  },
  {
    group: "Uncategorized",
    value: 4,
  },
];

export const donutDepartmentOptions = {
  title: "Patients by Nationality",
  resizable: true,
  donut: {
    center: {
      label: "Patients",
    },
  },
  height: "300px",
  theme: ChartTheme.WHITE,
};

export const horizontalBarData = [
  {
    group: "ART",
    value: 16,
  },
  {
    group: "TB",
    value: 15,
  },
  {
    group: "LAB",
    value: 50,
  },
  {
    group: "MCH",
    value: 1,
  },
  {
    group: "HTS",
    value: 5,
  },
];

export const horizontalBarOptions = {
  title: "Patients Served Per Service Area",
  legend: {
    position: LegendPositions.TOP,
  },
  axes: {
    left: {
      mapsTo: "group",
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      mapsTo: "value",
    },
  },
  height: "500px",
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

export const StackedBarData = [
  {
    group: "ART",
    key: "Triage",
    value: 16,
  },
  {
    group: "ART",
    key: "Clinician",
    value: 16,
  },
  {
    group: "ART",
    key: "LAB",
    value: 12,
  },
  {
    group: "ART",
    key: "Pharmacy",
    value: 16,
  },
  {
    group: "TB",
    key: "Triage",
    value: 15,
  },
  {
    group: "TB",
    key: "Clinician",
    value: 12,
  },
  {
    group: "TB",
    key: "LAB",
    value: 7,
  },
  {
    group: "TB",
    key: "Pharmacy",
    value: 10,
  },
];

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
