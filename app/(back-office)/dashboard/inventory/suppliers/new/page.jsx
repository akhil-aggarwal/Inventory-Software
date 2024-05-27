"use client"
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import FormHeader from "@/components/dashboard/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function NewSupplier({initialData = {}, isUpdate=false})
{ 
  const router = useRouter();
    const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
        } = useForm({
          defaultValues : initialData
        });

      const [loading, setLoading] = useState(false);

      function redirect(){
        router.replace("/dashboard/inventory/suppliers")
    } 

    async function onSubmit(data){
      console.log(data)
      const baseUrl = "http://localhost:3000"
      if(isUpdate)
        {
          //Update Request
          makePutRequest(setLoading,`${baseUrl}/api/suppliers/${initialData.id}`, data, "Supplier",  redirect ,reset)
        }else
        {
          makePostRequest(setLoading,`${baseUrl}/api/suppliers`, data, "Supplier", reset)
        }
      
      
    }

    return(
        <div>
            {/* Header */}
            <FormHeader title={isUpdate?"Update Supplier":"New Supplier"} href="/dashboard/inventory/suppliers"/>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            <TextInput 
            label="Supplier Name" 
            name="title" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <TextInput 
            label="Supplier Phone" 
            name="phone" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            className="w-full"
            />

            <TextInput 
            label="Supplier Email" 
            name="email" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="email"
            className="w-full"
            />

            <TextInput 
            label="Supplier Address" 
            name="address" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            className="w-full"
            />

            <TextInput 
            label="Supplier Contact Person" 
            name="contactPerson" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            className="w-full"
            />


            <TextInput 
            label="Supplier Code" 
            name="supplierCode" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            className="w-full"
            />

            <TextInput 
            label="Supplier TIN" 
            name="taxID" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            />

            {/**Text Area */}
            <TextareaInput 
            label="Supplier Payment Terms" 
            name="paymentTerms" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text"/>

            <TextareaInput 
            label="Notes" 
            name="notes" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text"/>


              </div>
              <SubmitButton isLoading={loading} title={isUpdate?"Updated Supplier":"New Supplier"} />
            </form>
        </div>
    )
}