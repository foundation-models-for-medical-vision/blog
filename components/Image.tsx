import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage
    src={typeof src === 'string' && src.startsWith('http') ? src : `${basePath || ''}${src}`}
    {...rest}
  />
)

export default Image
