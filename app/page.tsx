'use client';

import { Form, FormProvider, useForm, useController } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IFormInput from '../types/formInput'

export default function Home() {
  const formMethods = useForm<IFormInput>()
  const { control, formState: errors } = formMethods
  const { field: userField } = useController({
    name: "user",
    control,
    rules: { required: 'This field is required.' }
  
  });
  const { field: passwordField } = useController({
    name: "password",
    control,
    rules: { required: 'This field is required.' }
  });
  const { field: hostField } = useController({
    name: "host",
    control,
    rules: { required: 'This field is required.' }
  });
  const { field: portField } = useController({
    name: "port",
    control,
    rules: { required: 'This field is required.' }
  });
  const { field: databaseField } = useController({
    name: "database",
    control,
    rules: { required: 'This field is required.' }
  });

  const router = useRouter()

  function raiseNotification (msg: string, isError: boolean, autoClose: number) {
    if (isError) {
      return toast.error(msg, {
        position: 'top-right',
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      return toast.success(msg, {
        position: 'top-right',
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };
  
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-[#373c39] !rounded-[20px] !w-[500px]"
      />
      <main className="flex h-screen bg-red-300 flex-col items-center p-24 justify-between">
        <div className="flex w-full h-24 text-[40px] font-bold">
          <p className="text-center m-auto">Simple Database Explorer</p>
        </div>
        <FormProvider {...formMethods} >
          <Form className="flex w-full flex-col items-center"
            onSubmit={async ({ data }) => {
              raiseNotification('Connecting to the database...', false, 3000)
              const response: any = await fetch(`/api/schema?user=${data.user}&password=${data.password}&host=${data.host}&port=${data.port}&database=${data.database}`)
              const returnData = await response.json()
              if (returnData?.schemas?.length > 0) {
                localStorage.setItem('dbsession', JSON.stringify(data));
                raiseNotification('Connection Successful', false, 3000);
                setTimeout(() => router.push('/schema'), 3000)
              }
              else {
                raiseNotification('Connection Failed', true, 3000);
              }
            }}
            control={control}
          >
            <div className="flex text-center text-[40px] mb-10">Connect database...</div>
            <div className="flex flex-row items-center justify-between w-full mb-10">
              <label className="text-[32px]">User(*):</label>
              <input className="text-[32px] required" value={userField.value} onChange={userField.onChange} required />
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-10">
              <label className="text-[32px]">Password(*):</label>
              <input type="password" className="text-[32px] required" value={passwordField.value} onChange={passwordField.onChange} required />
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-10">
              <label className="text-[32px]">Host(*):</label>
              <input className="text-[32px] required" value={hostField.value} onChange={hostField.onChange} required />
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-10">
              <label className="text-[32px]">Port(*):</label>
              <input type="number" min={0} className="text-[32px] required" value={portField.value} onChange={portField.onChange} required />
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-10">
              <label className="text-[32px]">Database(*):</label>
              <input className="text-[32px] required" value={databaseField.value} onChange={databaseField.onChange} required />
            </div>
            <div className="flex w-full">
              <button type="submit" className="m-auto w-[50%] text-center text-[32px] bg-slate-600 hover:bg-slate-800">Explore</button>
            </div>
          </Form>
        </FormProvider>
        { !errors.isValid && (
          <div className='text-red-600 text-[32px] font-bold'>
            Fill All the required fields
          </div>
        )}
      </main>
    </>
  );
}
