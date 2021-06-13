import { Field, Form, Formik } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import FocusError from "../../shared/focusError";
 
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
interface Values {
  email: string;
  password: string;
}

const Login: React.FC<Record<string, unknown>> = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  if(query.get("token")) {
    history.push("/home");
  }
  const googlelogin = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };
  const login = (values: Values) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(res => {
        if(res.statusCode===401) {
          alert(res.message.indexOf("google")>-1 ? "you seem to login with google" : "Incorrect account or password");
          return;
        }
        history.push("/home");
      });
  };
  return (
    <div className="bg-gray-lightest w-screen h-screen pt-10">
      <div className="m-auto py-10 px-8 rounded-md bg-beige max-w-sm">
        <h2 className="text-center font-bold text-purple-dark mb-2">Login TODO</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={login}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field id="email" name="email" placeholder="email" autoFocus />
                {errors.email && touched.email ? <div className="text-red text-sm">{errors.email}</div> : null}
              </div>
              <div className="mb-4">
                <Field id="password" name="password" placeholder="password" type="password"/>
                {errors.password && touched.password ? <div className="text-red text-sm">{errors.password}</div> : null}
              </div>
              <button type="submit" className="btn btn-purple w-full" disabled={isSubmitting}>login</button>
              <div className="text-center my-1">or</div>
              <button type="button" className="btn w-full" onClick={googlelogin}>
                <div className="flex items-center justify-center">
                  <FcGoogle size={20}/>&nbsp;Sign in with Google
                </div>
              </button>
              <div className="flex justify-center mt-2">
                <Link to="/register" className="cursor-pointer text-purple hover:underline">register</Link>
              </div>
              <FocusError />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;