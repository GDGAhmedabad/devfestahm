import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

export const logPageView = (pageName = 'page_view') => logEvent(analytics, pageName);
export const logLogin = () => logEvent(analytics, 'login');
