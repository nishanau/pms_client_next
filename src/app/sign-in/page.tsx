"use client";
import { useAuthStore } from "@/stores/auth";
import { Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from 'next/link';
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';

export default function SignInPage() {
  const router = useRouter();
  const auth = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1077026512/photo/nature-inspired-table.jpg?s=612x612&w=0&k=20&c=TthBCamXFsPZt2CaCfd2EzuzeImWiwKTUZJTMEIKFcI=')",
      }}>
      <div className="bg-white bg-opacity-90 px-10 py-2 rounded-lg shadow-md mx-2 items-center">
        <div className="py-8 bg-cyan-950 rounded-lg flex items-center justify-center -translate-y-8">
          <p className="text-white font-mono font-semibold tracking-widest text-4xl">
            Vendure
          </p>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required('*Required')
              .max(15, 'Must be 15 characters or less')
            ,
            password: Yup.string().required('*Required')
              .min(8, 'Password must be atleast 8 characters long')

          })}
          onSubmit={async (values) => {
            const res = await login({
              identifier: values.username,
              password: values.password,
            }).catch(err => {
              console.error(err)
            });
            auth.setToken(res.jwt);
            router.replace('/')

          }}
        >
          <Form className="w-full max-w-xl space-y-4 my-2">
            <div className="mx-auto">
              <label htmlFor="username" className="text-gray-700 font-semibold mb-1">Username or Email:</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border border-gray-300 rounded-md py-2 px-6 w-full block"
              />
              <div className='text-sm text-red-600'>
                <ErrorMessage name="username" />
              </div>

            </div>

            <div className="pb-5 mx-auto">
              <label htmlFor="password" className="text-gray-700 font-semibold mb-1">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 rounded-md py-2 px-6 w-full block"
              />
              <div className='text-sm text-red-600'>
                <ErrorMessage name="password" />
              </div>


            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full block"
            >
              Sign In
            </Button>

            <div className="text-center pt-2">
              <Link href="#" className="text-sm text-amber-900">
                Forgot your Password?
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link href="../sign-up" className="text-amber-500 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
