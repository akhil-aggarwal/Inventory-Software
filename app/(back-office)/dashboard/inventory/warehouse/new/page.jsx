"use client"
import SelectInput from "@/components/FormInputs/SelectInput";
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

export default function NewWarehouse({initialData = {}, isUpdate=false})
{   
    const warehouseType = [
        {
            title: "Main",
            id : "main"
        },
        {
            title: "Branch",
            id : "branch"
        },
    ];

    console.log(warehouseType);

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
        router.replace("/dashboard/inventory/warehouse")
      }

        async function onSubmit(data){
            console.log(data)
            const baseUrl = "http://localhost:3000"
            if(isUpdate)
              {
                //Update Request
                makePutRequest(setLoading,`${baseUrl}/api/warehouse/${initialData.id}`, data, "Warehouse",  redirect ,reset)
              }else
              {
                makePostRequest(setLoading,`${baseUrl}/api/warehouse`, data, "Warehouse", reset)
              }
            
            
          }

    return(
        <div>
            {/* Header */}
            <FormHeader title={isUpdate?"Update Warehouse":"New Warehouse"} href="/dashboard/inventory/warehouse"/>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            
            <SelectInput register={register}
            className="w-full"
            name="type"
            label="Select Warehouse type"
            options={warehouseType}
            />
                        

            <TextInput 
            label="Warehouse Title" 
            name="title" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <TextInput 
            label="Warehouse Location" 
            name="location" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text" 
           
            />

            

            {/**Text Area */}
            <TextareaInput label="Warehouse Description" name="description" isRequired="true" register={register} errors={errors} type="text"/>


              </div>
              <SubmitButton isLoading={loading} title= {isUpdate?"Updated Warehouse":"New Warehouse"} />
            </form>
        </div>
    )
}