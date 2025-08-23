import LoginForm from './LoginForm';
import AuthFormLayout from '../../components/Auth/AuthFormLayout';

const LoginPage = () => {
   return (
      <AuthFormLayout
         title='Welcome Back'
         text='Please enter your details to access your account'
      >
         <LoginForm />
      </AuthFormLayout>
   );
};

export default LoginPage;