import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  UserCircleIcon,
  MailIcon,
  PhoneIcon,
  PhotographIcon,
} from "@heroicons/react/solid";
import ImageUpload from "../ImageUpload";
import * as Yup from "yup";
import * as moment from "moment";
import { errorAlert, successAlert } from "../../helpers/notifications";

const getImageDimensionsFromBase64 = (base64String) => {
  if (base64String === null) {
    return Promise.resolve({ width: 0, height: 0 });
  }
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve({ width: image.width, height: image.height });
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = base64String;
  });
};

const InternautesForm = () => {
  const [img, setImg] = useState("");
  useEffect(() => {
    formik.setFieldValue("photo", img);
  }, [img]);

  let internaute = {
    nom: "",
    prenom: "",
    dob: "",
    photo: "",
    tel: "",
    adress: "",
    email: "",
  };
  const sendInternaute = async (values) => {
    fetch("http://localhost:3000/api/v1/internautes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status !== 200) {
        errorAlert("Une erreur est survenue");
      } else {
        successAlert("Merci pour votre inscription");
        formik.resetForm();
      }
    });
  };

  const formik = useFormik({
    initialValues: internaute,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      nom: Yup.string().required("Merci de renseigner un nom"),
      prenom: Yup.string().required("Merci de renseigner un prénom"),
      dob: Yup.date()
        .required("Merci de renseigner une date de naissance")
        .nullable(),
      tel: Yup.string()
        .optional()
        .matches(
          /^[0-9]{10}$/,
          "Merci de renseigner un numéro de téléphone valide"
        ),
      adress: Yup.string().optional(),
      email: Yup.string()
        .required("Merci de renseigner un email")
        .email("Email invalide"),
    }),

    onSubmit: async (values) => {
      values.dob = moment(values.dob).format("DD/MM/YYYY");
      if (img !== null && img !== "") {
        getImageDimensionsFromBase64(img).then(async (dimensions) => {
          if (dimensions.width !== 200 || dimensions.height !== 200) {
            alert("Merci de choisir une image de 200x200 pixels");
            return;
          }
        });
      }
      await sendInternaute(values);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="border rounded p-4 max-w-md w-full"
      >
        <div className="mb-4 flex items-center">
          <UserCircleIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <label htmlFor="nom" className="pr-5">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nom}
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        {formik.errors.nom && formik.touched.nom && (
          <div className="text-red-500">{formik.errors.nom}</div>
        )}
        <div className="mb-4 flex items-center">
          <UserCircleIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <label htmlFor="prenom" className="pr-5">
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.prenom}
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        {formik.errors.prenom && formik.touched.prenom && (
          <div className="text-red-500">{formik.errors.prenom}</div>
        )}
        <div className="mb-4 flex items-center">
          <UserCircleIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <label htmlFor="dob" className="pr-5">
            Date de naissance
          </label>
          <input
            type="date"
            name="dob"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        {formik.errors.dob && formik.touched.dob && (
          <div className="text-red-500">{formik.errors.dob}</div>
        )}
        <div className="mb-4 flex items-center">
          <PhotographIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <label htmlFor="photo" className="pr-5">
            Photo
          </label>
          <div className="flex flex-col items-start w-full">
            <ImageUpload setter={setImg} />
            {formik.errors.photo && formik.touched.photo && (
              <div className="text-red-500">{formik.errors.photo}</div>
            )}
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <PhoneIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <label htmlFor="tel" className="pr-5">
            Téléphone
          </label>
          <input
            type="tel"
            name="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tel}
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        {formik.errors.tel && formik.touched.tel && (
          <div className="text-red-500">{formik.errors.tel}</div>
        )}
        <div className="mb-4 flex items-center">
          <UserCircleIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <label htmlFor="adress" className="pr-5">
            Adresse
          </label>
          <input
            type="text"
            name="adress"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.adress}
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        {formik.errors.adress && formik.touched.adress && (
          <div className="text-red-500">{formik.errors.adress}</div>
        )}
        <div className="mb-4 flex items-center">
          <MailIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
          <label htmlFor="email" className="pr-5">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-2 py-1 border rounded-md"
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternautesForm;
