import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import FocusError from "../../shared/focusError";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(3, "Too Short!")
    .required("Required")
});
interface Values {
  email: string;
  password: string;
  username: string;
}

const register: React.FC<Record<string, unknown>> = () => {
  const history = useHistory();

  return (
    <div className="bg-gray-lightest w-screen h-screen pt-10">
      <div className="m-auto py-10 px-8 rounded-md bg-beige max-w-sm">
        <h2 className="text-center font-bold text-purple-dark mb-2">Register TODO</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: ""
          }}
          validationSchema={RegisterSchema}
          onSubmit={(
            values: Values
          ) => {
            fetch("/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(values)
            }).then(res => {
              if (!res.ok) throw new Error(res.statusText);
              return res.json();
            }).then(data => {
              if(data.code== 200) {
                alert("Register success!");
                history.push("/login");
              }              
            });
          }}>
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <Field id="email" name="email" maxLength="50" placeholder="email" autoFocus />
                {errors.email && touched.email ? <div className="text-red text-sm">{errors.email}</div> : null}
              </div>
              <div className="mb-4">
                <Field id="password" name="password" maxLength="50" placeholder="password" type="password"/>
                {errors.password && touched.password ? <div className="text-red text-sm">{errors.password}</div> : null}
              </div>
              <div className="mb-4">
                <Field id="username" name="username" maxLength="50" placeholder="username" />
                {errors.username && touched.username ? <div className="text-red text-sm">{errors.username}</div> : null}
              </div>
              <button type="submit" className="btn btn-purple w-full">Register</button>
              <div className="flex justify-center mt-2">
                <Link to="/login" className="cursor-pointer text-purple hover:underline">Already have account? login</Link>
              </div>
              <FocusError />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default register;