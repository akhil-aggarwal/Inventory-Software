"use client"
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import FormHeader from "@/components/dashboard/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { Pencil, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export default function CreateItemForm({categories, units, brands, warehouses, suppliers, initialData = {}, isUpdate=false})
{   
    const [imageUrl, setImageUrl] = useState(initialData.imageUrl)

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
        router.replace("/dashboard/inventory/items")
    } 


      async function onSubmit(data){
        data.imageUrl = imageUrl
        console.log(data)
        const baseUrl = "http://localhost:3000"
        if(isUpdate)
          {
            //Update Request
            makePutRequest(setLoading,`${baseUrl}/api/items/${initialData.id}`, data, "Item",  redirect ,reset)
          }else
          {
            makePostRequest(setLoading,`${baseUrl}/api/items`, data, "Item", reset)
          }
        
        
      }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            

            <TextInput 
            label="Item Name" 
            name="title" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <SelectInput register={register}
            className="w-full"
            name="categoryId"
            label="Select the Item Category"
            options={categories}
            />
            
            <TextInput 
            label="Item SKU" 
            name="sku" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <TextInput 
            label="Item Barcode" 
            name="barcode" 
            isRequired="false" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <TextInput 
            label="Item Quantity" 
            name="qty" 
            register={register} 
            errors={errors} 
            type="text" 
            className="w-full"
            />

            <SelectInput register={register}
            className="w-full"
            name="unitId"
            label="Select the Item Unit"
            options={units}
            />    
            
            <SelectInput register={register}
            className="w-full"
            name="brandId"
            label="Select the Item Brand"
            options={brands}
            />    
            
            <TextInput 
            label="Buying Price" 
            name="buyingPrice" 
            register={register} 
            errors={errors} 
            type="number" 
            className="w-full"
            />

            <TextInput 
            label="Selling Price" 
            name="sellingPrice" 
            register={register} 
            errors={errors} 
            type="number" 
            className="w-full"
            />

            <SelectInput register={register}
            className="w-full"
            name="supplierId"
            label="Select the Item Supplier"
            options={suppliers}
            />    

            <TextInput 
            label="Re-Order Points" 
            name="reOrderPoint" 
            register={register} 
            errors={errors} 
            type="number" 
            className="w-full"
            />

            <SelectInput register={register}
            className="w-full"
            name="warehouseId"
            label="Select the Item Warehouse"
            options={warehouses}
            />    
            
            <TextInput 
            label="Item Weight in Kgs" 
            name="weight" 
            register={register} 
            errors={errors} 
            type="number" 
            className="w-full"
            />

            <TextInput 
            label="Item Dimensions in cm (L X B X H)" 
            name="dimensions" 
            register={register} 
            errors={errors} 
            className="w-full"
            />

<TextInput 
            label="Item GST Rate in %" 
            name="taxRate" 
            register={register} 
            type="number"
            errors={errors} 
            className="w-full"
            />

            {/**Text Area */}

            <TextareaInput 
            label="Item Description" 
            name="description" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text"/>

            <TextareaInput 
            label="Item Notes" 
            name="notes" 
            isRequired="true" 
            register={register} 
            errors={errors} 
            type="text"/>

            <ImageInput label="Item Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="imageUploader"/>


              </div>
              <SubmitButton isLoading={loading} title={isUpdate?"Updated Item":"New Item"} />
            </form>
    )
}