import ResetPasswordForm from './ResetPasswordForm';
import AuthFormLayout from '../../components/Auth/AuthFormLayout';

const ResetPasswordPage = () => {
   return (
      <AuthFormLayout
         title='Reset Password'
         text='Enter your email address that you used to create an account'
      >
         <ResetPasswordForm />
      </AuthFormLayout>
   );
};

export default ResetPasswordPage;