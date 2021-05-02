const useEnv = () => {
  return {
    timesheetUrl: process.env.TIMESHEET_URL || 'https://intranet.augensoftwaregroup.com',
    authCookie: process.env.TIMESHEET_AUTH_COOKIE || 'ASP.NET_SessionId',
  };
};

export { useEnv };
