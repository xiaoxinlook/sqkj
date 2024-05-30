import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import { fontSans } from '@/config/fonts';
import clsx from "clsx";
import Script from "next/script";
import Metrika from "next-metrika";
import {GoogleAnalytics} from '@next/third-parties/google'

export const metadata = {
  title: {
		default: '色情空间',
		template: '%s - 色情空间',
	},
  description:
    '色情空间是一个提供海量高清视频在线观看的平台,包括国产自拍、国产黑料、国产探花、国产嫩妹等多个分类,满足您的观影需求。',
  keywords: [
    '国产自拍',
    '国产黑料',
    '国产嫩妹',
    '国产萝莉',
    '国产乱伦',
    '国产直播',
    '国产福利',
    '国产视频',
  ],
  
  generator: 'Next.JS',
  applicationName: '色情空间',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: '色情空间', url: 'https://SQKJ.RU' }],
  creator: '色情空间团队',
  publisher: '色情空间 Website Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  metadataBase: new URL('https://SQKJ.RU'),
  alternates: {
    canonical: '/',
  },
  
  openGraph: {
    title: '色情空间 - 海量国产视频在线观看',
    description:
      '色情空间是一个提供海量高清视频在线观看的平台,包括国产自拍、国产黑料、国产探花、国产嫩妹等多个分类,满足您的观影需求。',
    type: 'website',
    url: 'https://SQKJ.RU',
    siteName: '色情空间',
    images: [
      {
        url: '/og-image.jpg',
        width: 700,
        height: 400,
      },
    ],
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myvideowebsite',
    creator: '@myvideowebsite',
    images: '/twitter-image.png',
  },
  
  
  category: 'entertainment',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
      <Metrika id={97197255} />
      <GoogleAnalytics gaId="G-Y65H54Y45D" />
        <Providers>
        <main className="h-full lg:px-6">
        <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
          {children}
          </div>
          </main>
          <footer className="w-full flex flex-col items-center justify-center py-3">
							<div className="flex items-center gap-1 mt-6 mb-20 md:mb-8">
								<span className="text-default-600">Powered by</span>
								<p className="text-primary">色情空间</p>
							</div>
							<Script src="/script.js" strategy="lazyOnload" />
						</footer>
        </Providers>
      </body>
    </html>
  )
}
