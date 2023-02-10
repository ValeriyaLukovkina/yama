import React, {FormEvent, useRef} from "react";
import axios from "axios";

interface SavePhotoProps {
    id : number
    onClose: () => void
    onSave: (id : number) => void
}


export function SavePhoto( {id, onClose, onSave} : SavePhotoProps) {
    const url = 'http://yama-new.ru:8088/admin/saveImage/'+ id
    const fileRef = useRef<HTMLInputElement>(null)

    const submitForm = async  (event: FormEvent) => {
        event.preventDefault()
        const formData = new FormData()
        if (fileRef.current?.files!= null) {
            formData.append("file", fileRef.current.files[0])
            await axios.post(url, formData).then((response) => {
                onSave(response.data)
            })
        }
        onClose()
    }



    return (
        <form onSubmit={submitForm}>
            <h1 className="text-2xl text-center mb-2">Добавление (изменение) фотографии</h1><br/>
            <input type="file" ref={fileRef} required={true}/>
            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Отправить фото</button>
        </form>
    )
}