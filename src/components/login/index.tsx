import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { FunctionComponent } from "react";
import { FcGoogle } from "react-icons/fc";

interface Values {
  account: string;
  password: string;
}

const Login: FunctionComponent<Record<string, unknown>> = () => {


  return (
    <div className="bg-gray-lightest w-screen h-screen pt-10">
      <div className="m-auto py-10 px-8 rounded-md bg-beige max-w-sm">
        <Formik
          initialValues={{
            account: "",
            password: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}>
          <Form>
            <div className="flex mb-4">
              <Field id="account" name="account" className="" placeholder="account" autoFocus />
            </div>
            <div className="flex mb-4">
              <Field id="password" name="password" className="" placeholder="password" />
            </div>
            <div>
              <button type="submit" className="btn btn-purple w-full mb-4">login</button>
              <button type="submit" className="btn w-full">
                <div className="flex items-center justify-center">
                  <FcGoogle size={20}/>&nbsp;Sign in with Google
                </div>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;