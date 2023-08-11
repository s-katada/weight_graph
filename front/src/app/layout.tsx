'use client';

import { Menu, MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
      <a href='/'>グラフ</a>
    ),
    key: 'home',
  },
  {
    label: (
      <a href='/register'>体重登録</a>
    ),
    key: 'register',
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Menu mode="horizontal" items={items} />

        {children}
      </body>
    </html>
  )
}
