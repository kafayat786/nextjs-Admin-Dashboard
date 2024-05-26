import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { signIn } from "next-auth/react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const toast = useRef(null);

  const router = useRouter();
  const toastMessage = (status, msg) => {
    toast.current?.show({
      severity: status,
      summary: status,
      detail: msg,
    });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values, e) => {
      // const result = await signIn("credentials", {
      //   redirect: false,
      //   email: values.email,
      //   password: values.password,
      // });
      router.push("/");

      // if (result.error) {
      //   toastMessage("error", "Invalid Credentials");
      // } else {
      //   toastMessage("success", "Login Sccucessful");
      //   window.location.href = "/";
      // }
    },
  });

  return (
    <div className="p-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-field">
          <InputText
            id="email"
            name="email"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.email && formik.errors.email ? "p-invalid" : ""
            }
          />
          <p>
            {formik.touched.email && formik.errors.email ? (
              <Message severity="error" text={formik.errors.email} />
            ) : null}
          </p>
        </div>

        <div className="p-field my-3">
          <Password
            placeholder="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.password && formik.errors.password
                ? "p-invalid"
                : ""
            }
            feedback={false}
          />
          <p>
            {formik.touched.password && formik.errors.password ? (
              <Message
                severity="error"
                className="p-1 bg-none"
                text={formik.errors.password}
              />
            ) : null}
          </p>
        </div>
        <Button type="submit" label="Submit" className="mt-2" />
      </form>
      <Toast className="flex-col" ref={toast} />
    </div>
  );
};

export default LoginForm;
