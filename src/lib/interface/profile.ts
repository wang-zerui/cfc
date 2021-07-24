export interface ICredentials {
  ak: string;
  sk: string;
}

export interface ServerlessProfile {
  project: {
    component?: string;
    access: string;
    projectName: string;
  };
  appName: string;
}
