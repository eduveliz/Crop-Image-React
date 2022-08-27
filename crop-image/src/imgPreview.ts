import {PixelCrop} from 'react-image-crop'
import {canvasPreview} from './canvasPreview'

let previewUrl = ''

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve: any) => {
        canvas.toBlob(resolve)
    })
}


function blobToBase64(blob :any) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}


// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
    image: HTMLImageElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0,
) {
    const canvas = document.createElement('canvas')
    canvasPreview(image, canvas, crop, scale, rotate)

    const blob = await toBlob(canvas)
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
    }

    const reader = new FileReader();
    previewUrl = URL.createObjectURL(blob)
    blobToBase64(blob).then(r=> console.log(r))

    return previewUrl
}
