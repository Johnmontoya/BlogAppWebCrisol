import React, { useState } from "react"

type DefaulTypes = {
    [key: string]: any
}

type ReturnTypes = [
    any,
    (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void,
    (value: any) => void
]

type InputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const useInputs = (initialValues: DefaulTypes): ReturnTypes => {
    const [values, setValues] = useState(initialValues);

    const onChange = (event: React.ChangeEvent<InputElements>) => {
        const { name, value, type } = event.target;
        
        const newValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;

        setValues({
            ...values,
            [name]: newValue // Usamos el valor booleano o string según corresponda
        });
    }

    return [values, onChange, setValues]
}

export default useInputs;