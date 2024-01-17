import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import { Text, Button, Input, Textarea, Heading } from '@chakra-ui/react';


const serviceId:any = process.env.NEXT_PUBLIC_SERVICE_ID
const templateId:string = process.env.NEXT_PUBLIC_TEMPLATE_ID as string
const userId:string = process.env.NEXT_PUBLIC_USER_ID as string

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  const onSubmit = async (data: any) => {

    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        name,
        email,
        subject,
        message
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);

      reset();
      toastifySuccess();
    } catch (e) {
    }
  };

  return (
    <div className='ContactForm'>
      <div className="info-text">
        <Heading>Une Question ? Contact nous</Heading>
        <Text>Nous vous répondrons dans les plus bref délais</Text>
      </div>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <div className='contactForm'>
                <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className='row formRow'>
                    <div className='col-6'>
                      <Input
                        type='text'
                        {...register('name', {
                          required: { value: true, message: 'Please enter your name' },
                          maxLength: {
                            value: 30,
                            message: 'Please use 30 characters or less'
                          }
                        })}
                        className='form-control formInput'
                        placeholder='Name'
                      ></Input>
                    </div>
                    <div className='col-6'>
                      <Input
                        type='email'
                        {...register('email', {
                          required: true,
                          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        })}
                        className='form-control formInput'
                        placeholder='Email address'
                      ></Input>
                    </div>
                  </div>
                  <div className='row formRow'>
                    <div className='col'>
                      <Input
                        type='text'
                        {...register('subject', {
                          required: { value: true, message: 'Please enter a subject' },
                          maxLength: {
                            value: 75,
                            message: 'Subject cannot exceed 75 characters'
                          }
                        })}
                        className='form-control formInput'
                        placeholder='Subject'
                      ></Input>
                    </div>
                  </div>
                  <div className='row formRow'>
                    <div className='col'>
                      <Textarea
                        rows={3}
                        {...register('message', {
                          required: true
                        })}
                        className='form-control formInput'
                        placeholder='Message'
                      ></Textarea>
                    </div>
                  </div>
                  <Button className='submit-btn' type='submit'>
                    Submit
                  </Button>
                </form>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactForm;