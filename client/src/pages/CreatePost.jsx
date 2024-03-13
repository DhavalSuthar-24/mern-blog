import { FileInput, Select, TextInput } from "flowbite-react"
import { Button } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
  return (
    <div className="p-3  max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold ">Create a post</h1>
<form  className="flex flex-col gap-4  ">
    <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput type="text" placeholder="Title " required id="title" className="flex-1 " />
        <Select>
            <option value="uncategerized">Select a celegory</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="news">News</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>

        </Select> </div>
<div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted  p-3">
    <FileInput type="file"  accept="images/*"/>
    <Button type="button" gradientDuoTone="purpleToBlue" size="sm">Upload image</Button>

</div>
<ReactQuill required theme="snow" placeholder="write something..." className="h-72 mb-12"/>
   <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
   
</form>
        
    </div>
  )
}

export default CreatePost