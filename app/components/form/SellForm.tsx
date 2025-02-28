"use client"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import SelectCategory from '../SelectCategory';
import { Textarea } from '@/components/ui/textarea';
import { TipTapEditor } from '../Editor';
import { UploadDropzone } from '@/app/lib/uploadthing';
import { toast } from 'sonner';
import { Submitbutton } from '../SubmitButtons';
import { useFormState } from 'react-dom';
import { SellProduct, State } from '@/app/actions';
import { JSONContent } from '@tiptap/react';

export default function SellForm() {
    const initalState : State= {message: "", status: undefined}
    const [state, formAction] = useFormState(SellProduct, initalState)
    const [json, setJson] = useState<null | JSONContent>(null);
    const [images, setImages] = useState<null | string[]>(null);
    const [productFile, SetProductFile] = useState<null | string>(null);

    useEffect(() =>{
        if(state.status === "success"){
        toast.success(state.message);
        } else if (state.status === "error"){
        toast.error(state.message);
        }
    }, [state])
  return (
    <div>
        <form action={formAction}>
                <CardHeader>
                    <CardTitle>Sell Your Products With Ease </CardTitle>
                    <CardDescription>Please describe your products here in details so that it can be sold</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-10">

                  <div className="flex flex-col gap-y-2">
                    <Label>Name</Label>
                    <Input name="name" type="text" placeholder="Name of your Product" required minLength={3} />
                    {state?.errors?.["name"]?.[0] && (
                      <p className="text-red-500">{state?.errors?.["name"]?.[0]}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <Label>Category</Label>
                    <SelectCategory />
                    {state?.errors?.["category"]?.[0] && (
                      <p className="text-red-500">{state?.errors?.["category"]?.[0]}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <Label>Price</Label>
                    <Input placeholder="€200" type="numeric"name="price" required min="1"/>
                    {state?.errors?.["price"]?.[0] && (
                      <p className="text-red-500">{state?.errors?.["price"]?.[0]}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <Label>Small Summary </Label>
                    <Textarea name="smallDescription" placeholder="Please describe your product shortly right here..." required minLength={5}/>
                    {state?.errors?.["smallDescription"]?.[0] && (
                      <p className="text-destructive">{state?.errors?.["smallDescription"]?.[0]}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <input type="hidden" name="description" value={JSON.stringify(json)} />
                    <Label>Description</Label>
                    <TipTapEditor json={json} setJson={setJson} />
                    {state?.errors?.["description"]?.[0] && (
                      <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <input type="hidden" name="images" value={JSON.stringify(images)} />
                    <Label>Product Images</Label>
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) =>{ setImages(res.map((item) => item.url)); toast.success("Your images have been uploaded")}} 
                      onUploadError={(error: Error) => { toast.error("Something went wrong, try again")}} 
                    />
                    {state?.errors?.["images"]?.[0] && (
                      <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <input type="hidden" name="productFile" value={productFile ?? ""} />
                    <Label>Product File</Label>
                    <UploadDropzone 
                      onClientUploadComplete={(res) => { SetProductFile(res[0].url);  toast.success("Your Productfile have been uploaded")}}
                      endpoint="productFileUpload"
                      onUploadError={(error: Error) => { toast.error("Something went wrong, try again")}} 
                    />
                    {state?.errors?.["productFile"]?.[0] && (
                      <p className="text-destructive">{state?.errors?.["productFile"]?.[0]}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="mt-5">
                  <Submitbutton title="Create Your Product" />
                </CardFooter>
            </form>
    </div>
  )
}
