import { useState } from "react"

const useForm = (initialForm = {},onSubmit)=>{
    const [form , setForm] = useState(initialForm)

    const  handleChange = (e)=>{
        const {name , value} = e.target
        setForm({...form , [name]:value})
    }

    function resetForm(newValues = initialForm) {
  setForm(newValues);
}


    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit(form)
    }


    return {form , handleChange ,handleSubmit , resetForm}

}

export default useForm