import { IconCheck } from '@tabler/icons'

export default function Features({ data, title, index }: any) {
  return (
    <div className='flex items-center justify-between flex-wrap'>
      <div className='flex items-center justify-between flex-wrap gap-2 sm:gap-8'>
        <div>
          {data.slice(0, index).map((item: string, idx: number) => (
            <div key={idx} className='flex items-center gap-2'>
              <IconCheck color='green' />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          {data.slice(index, data.length).map((item: string, idx: number) => (
            <div key={idx} className='flex items-center gap-2'>
              <IconCheck color='green' />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
