import React, {useState} from 'react'
import Crossicon from '../../icon/Crossicon';
import Button from './Button';
import Input from './Input';

const CreateContentModel = ({open,onClose}) => {

    const [modalOpen,setModalOpen] = useState(false);

  return (
    <div>
        {open && <div className='w-screen h-screen bg-slate-600 fixed top-0 left-0 opacity-70 flex justify-center items-center'>
            <div className='bg-white opacity-100 p-4 rounded'>
                <div className='flex justify-end'>
                    <div className='flex justify-end' onClick={  onClose}>
                        <Crossicon size="sm"/>
                    </div>
                    
                    <div>
                        <Input placeholder={"Title"}/>
                        <Input placeholder={"Link"}/>
                    </div>
                    <Button variant='primary' text="submit"/>
                </div>
            </div>

    </div>}
    </div>
    
  )
}



export default CreateContentModel