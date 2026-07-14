// Export only app-facing Application facades and inbound adapters.
// Peer Contexts use contracts/<version>/public.ts.
export {
  browserSessionToken,
  clearBrowserSession,
  currentBrowserAuthentication,
  establishBrowserSession,
  requireBrowserAuthentication,
  type BrowserSessionIdentity,
} from "./adapters/inbound/http/browser-session";
