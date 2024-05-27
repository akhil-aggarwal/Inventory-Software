"use client"
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import { makePostRequest } from "@/lib/apiRequest";
import { Plus} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


export default function AddInventoryForm({items, warehouses, suppliers})
{   


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const [loading, setLoading] = useState(false);

      async function onSubmit(data){
        console.log(data)
        const baseUrl = "http://localhost:3000"
        makePostRequest(setLoading,`${baseUrl}/api/adjustments/add`, data, "Add", reset)
      }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                
            <TextInput 
            label="Reference Number" 
            name="referenceNumber" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            defaultValue=""
            />

            <SelectInput register={register}
            className="w-full"
            name="itemId"
            label="Select the Item"
            options={items}
            />   

             <SelectInput register={register}
            className="w-full"
            name="supplierId" 
            label="Select the Supplier"
            options={suppliers}
            />    

            <TextInput 
            label="Enter Qty of Stock to Add" 
            name="addStockQty" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <SelectInput register={register}
            className="w-full"
            name="recievingWarehouseId"
            label="Select the Warehouse that will recieve Stock"
            options={warehouses}
            />    

            {/**Text Area */}
            <TextareaInput label="Adjustment Notes" name="notes" isRequired="true" register={register} errors={errors} type="text"/>


              </div>
              <SubmitButton isLoading={loading} title="Adjustments" />
            </form>
    )
}