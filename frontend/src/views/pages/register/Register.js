import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { validationSchema } from "./validation";
import request from "../../../services/request";
import { useFormik } from "formik/dist/index";
import FormikInput from "src/reusable/FormikInput";
import { setUaaCookie } from "../../../utils/auth.util";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeat: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await request.post("/api/users/create", values);
      if (result?.ok && result?.data?.data?.token) {
        setUaaCookie(result?.data?.data?.token);
        window.location.replace("/home");
      }
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={formik.handleSubmit}>
                  <h1>Register</h1>

                  <p className="text-muted">Create your account</p>

                  <FormikInput
                    type="text"
                    name="username"
                    formik={formik}
                    label={"Username"}
                  />
                  <FormikInput
                    type="text"
                    name="email"
                    formik={formik}
                    label={"Email"}
                  />
                  <FormikInput
                    type="password"
                    name="password"
                    formik={formik}
                    label={"Password"}
                  />
                  <FormikInput
                    type="password"
                    name="repeat"
                    formik={formik}
                    label={"Repeat Password"}
                  />
                  <CButton
                    style={{ marginTop: 50, margin: "auto", width: "500px" }}
                    type={"submit"}
                    color="success"
                    block
                  >
                    Create Account
                  </CButton>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
