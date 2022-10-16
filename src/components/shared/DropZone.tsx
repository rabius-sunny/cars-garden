import { useState } from 'react'
import { Group, Image, SimpleGrid, Text, useMantineTheme } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons'
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath
} from '@mantine/dropzone'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import axios from 'axios'
import { addCarImage, makePending, makeIdle } from 'redux/slices/supSlice'

export default function DropZone(props: Partial<DropzoneProps>) {
  const [image, setImage] = useState<FileWithPath[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useMantineTheme()
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.sup.imageStatus)

  const previews = image.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    )
  })
  const handleFile = (file: any) => {
    setLoading(true)
    dispatch(makePending())
    const image = new FormData()
    image.set('key', process.env.REACT_APP_IMG_URL || '')
    image.append('image', file[0])

    axios
      .post('https://api.imgbb.com/1/upload', image)
      .then(res => {
        dispatch(addCarImage(res.data.data.display_url.toString()))
        setLoading(false)
        dispatch(makeIdle())
      })
      .catch(err => {
        setLoading(false)
        dispatch(makeIdle())
        alert('error occured, try again')
      })
  }
  return (
    <>
      <Dropzone
        loading={loading}
        onDrop={files => {
          handleFile(files)
          setImage(files)
        }}
        onReject={() => alert('file rejected')}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        sx={theme => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],

          '&[data-accept]': {
            color: theme.white,
            backgroundColor: theme.colors.blue[6]
          },

          '&[data-reject]': {
            color: theme.white,
            backgroundColor: theme.colors.red[6]
          }
        })}
        {...props}
      >
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size='xl'>Drag images here or click to select files</Text>
            <Text size='sm' color='dimmed'>
              Attach the photo of your beautiful car, file shouldn't exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {status === 'idle' && (
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          mt={previews.length > 0 ? 'lg' : 0}
        >
          {previews}
        </SimpleGrid>
      )}
    </>
  )
}
