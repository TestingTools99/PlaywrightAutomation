const report = require("multiple-cucumber-html-reporter");

const currentDate = new Date();
const executionStartTime = currentDate.toLocaleString("en-US", {
  timeZone: "Asia/Kolkata", // Adjust to your desired timezone
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const endDate = new Date();
const executionEndTime = endDate.toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

report.generate({
  jsonDir: "./test-result/report/",
  reportPath: "./test-result/report/",
  metadata: {
    browser: {
      name: "chrome",
      version: "131",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Xero Automation" },
      { label: "Execution Start Time", value: executionStartTime },
      { label: "Execution End Time", value: executionEndTime },
    ],
  },
});
