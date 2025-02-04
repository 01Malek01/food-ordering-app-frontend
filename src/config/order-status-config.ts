type orderStatusInfo = {
  label: string;
  value: string;
  progressValue: number;
};
export const orderStatusList: orderStatusInfo[] = [
  {
    label: "Placed",
    value: "placed",
    progressValue: 0,
  },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
  },
  {
    label: "In Progress",
    value: "inProgress",
    progressValue: 50,
  },
  {
    label: "Out For Delivery",
    value: "outForDelivery",
    progressValue: 75,
  },
  {
    label: "Delivered",
    value: "delivered",
    progressValue: 100,
  },
];
