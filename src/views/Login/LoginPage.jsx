import LoginForm from './LoginForm';
import AuthFormLayout from '../../components/Auth/AuthFormLayout';

const LoginPage = () => {
   return (
      <AuthFormLayout
         title='Welcome Back'
         text='Enter email and password to access your account'
      >
         <LoginForm />
      </AuthFormLayout>
   );
};

export default LoginPage;