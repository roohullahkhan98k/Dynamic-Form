import React from "react";
import { Form } from "../../components";
import formData from "../../json/test2.json";

const HomePage = () => (
  <div>
            <Form formData={formData} />
        </div>
    );


export default HomePage;
