import { Field, Form, Formik } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "../../layout/AuthLayout";
import { userLogin } from "../../service/authService";
import FocusError from "../../shared/focusError";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
interface Values {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const googlelogin = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };
  const login = (values: Values, { setSubmitting }: any) => {
    userLogin(values.email, values.password).then(res => {
      if (res) {
        history.push("/home");
      }
    }).catch(err => {
      alert(err.response.status === 401 ? err.response.data.message : "something wrong! Please try again!");
      return null;
    }).finally(() => {
      setSubmitting(false);
    });
  };
  return (
    <AuthLayout label={"Login TODO"}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={loginSchema}
        onSubmit={login}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field id="email" name="email" placeholder="email" autoFocus />
              {errors.email && touched.email ? <div className="text-red text-sm">{errors.email}</div> : null}
            </div>
            <div className="mb-4">
              <Field id="password" name="password" placeholder="password" type="password" />
              {errors.password && touched.password ? <div className="text-red text-sm">{errors.password}</div> : null}
            </div>
            <button type="submit" className="btn btn-purple w-full" disabled={isSubmitting}>login</button>
            <div className="text-center my-1">or</div>
            <button type="button" className="btn w-full" onClick={googlelogin}>
              <div className="flex items-center justify-center">
                <FcGoogle size={20} />&nbsp;Sign in with Google
              </div>
            </button>
            <div className="flex justify-center mt-2">
              <Link to="/register" className="cursor-pointer text-purple hover:underline">register</Link>
            </div>
            <FocusError />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;