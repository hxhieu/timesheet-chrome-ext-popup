const getEnv = () => {
  return {
    timesheetUrl: process.env.TIMESHEET_URL || 'https://intranet.augensoftwaregroup.com/Timesheet2',
    authCookie: process.env.TIMESHEET_AUTH_COOKIE || 'ASP.NET_SessionId',
    babylonJsDebug: process.env.BABYLON_DEBUG,
  };
};

export { getEnv };
