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

export const stackedBarData = [
  {
    group: "InPatient",
    key: "Jan",
    value: 32432,
  },
  {
    group: "InPatient",
    key: "Feb",
    value: 21312,
  },
  {
    group: "InPatient",
    key: "March",
    value: 56456,
  },
  {
    group: "InPatient",
    key: "April",
    value: 21312,
  },
  {
    group: "InPatient",
    key: "May",
    value: 34234,
  },
  {
    group: "InPatient",
    key: "Jun",
    value: 32432,
  },
  {
    group: "InPatient",
    key: "Jul",
    value: 21312,
  },
  {
    group: "InPatient",
    key: "Aug",
    value: 56456,
  },
  {
    group: "InPatient",
    key: "Sept",
    value: 21312,
  },
  {
    group: "InPatient",
    key: "Oct",
    value: 34234,
  },
  {
    group: "InPatient",
    key: "Nov",
    value: 21312,
  },
  {
    group: "InPatient",
    key: "Dec",
    value: 56456,
  },
  {
    group: "OutPatient",
    key: "Jan",
    value: 12312,
  },
  {
    group: "OutPatient",
    key: "Feb",
    value: 23232,
  },
  {
    group: "OutPatient",
    key: "March",
    value: 34232,
  },
  {
    group: "OutPatient",
    key: "April",
    value: 12312,
  },
  {
    group: "OutPatient",
    key: "May",
    value: 34234,
  },
  {
    group: "OutPatient",
    key: "Jun",
    value: 23232,
  },
  {
    group: "OutPatient",
    key: "Jul",
    value: 34232,
  },
  {
    group: "OutPatient",
    key: "Aug",
    value: 12312,
  },
  {
    group: "OutPatient",
    key: "Sept",
    value: 34234,
  },
  {
    group: "OutPatient",
    key: "Oct",
    value: 34232,
  },
  {
    group: "OutPatient",
    key: "Nov",
    value: 12312,
  },
  {
    group: "OutPatient",
    key: "Dec",
    value: 34234,
  },
];

export const stackedBarOptions = {
  title: "POC Actived Points",
  legend: {
    position: LegendPositions.TOP,
  },
  axes: {
    left: {
      mapsTo: "value",
      stacked: true,
    },
    bottom: {
      mapsTo: "key",
      scaleType: ScaleTypes.LABELS,
    },
  },
  height: "500px",
  width: "auto",
};

export const horizontalBarData = [
  {
    group: "ART",
    value: 10,
  },
  {
    group: "TB",
    value: 10,
  },
  {
    group: "LAB",
    value: 256,
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
  title: "Patients Served Vs Service Point",
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

export const lineData = [
  {
    group: "ART",
    key: "Triage",
    value: 1,
  },
  {
    group: "ART",
    key: "Clinician",
    value: 1,
  },
  {
    group: "ART",
    key: "LAB",
    value: 1,
  },
  {
    group: "ART",
    key: "Pharmacy",
    value: 1,
  },
  {
    group: "TB",
    key: "Triage",
    value: 0,
  },
  {
    group: "TB",
    key: "Clinician",
    value: 0,
  },
  {
    group: "TB",
    key: "LAB",
    value: 1,
  },
  {
    group: "TB",
    key: "Pharmacy",
    value: 1,
  },
];

export const linePOCOptions = {
  title: "POC Activated Service Points",
  axes: {
    bottom: {
      title: "Service Point",
      mapsTo: "key",
      scaleType: ScaleTypes.LABELS,
    },
    left: {
      mapsTo: "value",
      title: "Status",
      scaleType: ScaleTypes.LABELS,
    },
  },
  height: "500px",
};
