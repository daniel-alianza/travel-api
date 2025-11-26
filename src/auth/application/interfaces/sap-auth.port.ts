export interface SapAuthPort {
  login(companyId: number): Promise<{ SessionId: string }>;
  logout(): Promise<void>;
}
