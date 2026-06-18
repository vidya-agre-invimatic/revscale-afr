'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  age: Yup.number()
    .min(18, 'Must be at least 18')
    .max(100, 'Must be at most 100')
    .required('Age is required')
    .typeError('Age must be a number'),
});

interface FormValues {
  name: string;
  email: string;
  age: string;
}

const initialValues: FormValues = { name: '', email: '', age: '' };

export default function SampleForm() {
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(`Submitted:\n${JSON.stringify(values, null, 2)}`);
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-800">Sample Form (Formik + Yup)</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
          placeholder="Jane Doe"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs">{formik.errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          placeholder="jane@example.com"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs">{formik.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="age" className="text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          id="age"
          type="number"
          {...formik.getFieldProps('age')}
          placeholder="25"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.age && formik.errors.age && (
          <p className="text-red-500 text-xs">{formik.errors.age}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
