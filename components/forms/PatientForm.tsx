"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneinput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}




const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })


  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Zdravo 👋</h1>
            <p className="text-dark-700">Dobrodošli na SALCORP panel.</p>
        </section>

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Ime i prezime"
            placeholder="Nikola Nikolić"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email:"
            placeholder="nikola@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />
        <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Telefon:"
            placeholder="64 555 55 55"
        />
        <SubmitButton isLoading={isLoading}>Započni registraciju</SubmitButton>
      </form>
    </Form>
    )
}

export default PatientForm