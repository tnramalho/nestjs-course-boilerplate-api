export interface GitHubProfileInterface {
  id: string;
  username?: string;
  displayName?: string;
  emails: { value: string }[];
}
