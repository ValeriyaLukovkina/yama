
interface ImageProps {
    imageId : number,
    src: string,
}




export function Image({imageId, src} : ImageProps) {
    return (
        <div>
            <img src={src+imageId} alt="Фотографии нет"/>
        </div>
    )
}