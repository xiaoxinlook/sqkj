// components/home/content.jsx
import React from 'react'
import { CardBalance } from './card-balance'
import { getContents } from '@/config/api'

const categories = [
  '国产嫩妹',
  '国产自拍',
  '国产偷拍',
  '国产探花',
  '国产黑料',
  '国产直播',
]

const Content = async () => {
  const videoData = await Promise.all(
    categories.map((category) =>
      getContents({ category, size: 10, type: 'movie,tv' })
    )
  ).catch((error) => {
    console.error('Failed to fetch video data:', error)
    return []
  })

  const contentData = videoData.flat()

  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">分类名称</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5 w-full">
              {contentData.map((video, index) => (
                <CardBalance key={index} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content