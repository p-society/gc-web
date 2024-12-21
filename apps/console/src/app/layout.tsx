import './global.css';
import ThemeProvider from '@gc-broadcast-web/utils/theme/index';
import { primaryFont } from '@gc-broadcast-web/utils/theme/typography';
import ProgressBar from '@gc-broadcast-web/components/progress-bar';
import { MotionLazy } from '@gc-broadcast-web/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from '@gc-broadcast-web/components/settings';
import { ReduxProvider } from "@gc-broadcast-web/redux/ReduxProvider";
import { SnackbarProvider } from "@gc-broadcast-web/components/snackbar";
import config from "@gc-broadcast-web/config/index";
import { ValidateToken } from "@gc-broadcast-web/utils/auth/guard/auth-guard";
import ConfirmProvider from "@gc-broadcast-web/components/confirm/ConfirmProvider";
import { DashboardLayoutWIthNav } from "../sections/DashboardLayoutWithNav";

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: config.appName,
  description: config.description,
  // keywords: 'react,material,kit,application,dashboard,admin,template',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <ReduxProvider>
          {/*<AuthProvider>*/}
          <SettingsProvider
            defaultSettings={{
              themeMode: 'dark', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'bold', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'red', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: true,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <ConfirmProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    <ValidateToken>
                      <DashboardLayoutWIthNav>
                        {children}
                      </DashboardLayoutWIthNav>
                    </ValidateToken>
                  </ConfirmProvider>
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
          {/*</AuthProvider>*/}
        </ReduxProvider>
      </body>
    </html>
  );
}
