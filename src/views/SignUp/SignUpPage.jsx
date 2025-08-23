import AuthFormLayout from '../../components/Auth/AuthFormLayout';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
   return (
      <AuthFormLayout
         title='Create an Account'
         text='Please enter your details to create an account'
      >
         <SignUpForm />
      </AuthFormLayout>
   );
};

export default SignUpPage;