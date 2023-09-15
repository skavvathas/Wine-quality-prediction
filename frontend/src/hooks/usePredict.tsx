import React from 'react';
import {useState} from "react";

const usePredict = () => {
    const [isLoading, setIsLoading] = useState<boolean>();

    const predict = async (
        volatile_acidity: number,
        citric_acid: number,
        residual_sugar: number,
        chlorides: number,
        free_sulfur_dioxide: number,
        total_sulfur_dioxide: number,
        density: number,
        pH: number,
        sulphates: number,
        alcohol: number,
        Type_Red_Wine: boolean,
        Type_White_Wine: boolean
    ) => {

        try {

            console.log(volatile_acidity,
                citric_acid,
                residual_sugar,
                chlorides,
                free_sulfur_dioxide,
                total_sulfur_dioxide,
                density,
                pH,
                sulphates,
                alcohol,
                Type_Red_Wine,
                Type_White_Wine);

            const requestBody = {
                "volatile acidity": volatile_acidity,
                "citric acid": citric_acid,
                "residual sugar": residual_sugar,
                "chlorides": chlorides,
                "free sulfur dioxide": free_sulfur_dioxide,
                "total sulfur dioxide": total_sulfur_dioxide,
                "density": density,
                "pH": pH,
                "sulphates": sulphates,
                "alcohol": alcohol,
                "Type_Red Wine": Type_Red_Wine,
                "Type_White Wine": Type_White_Wine
                };

            console.log(requestBody);

            const response = await fetch('http://localhost:8000/predict/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, // when we send data to server with a body
                body: JSON.stringify(requestBody) // in server side we use body.firstname, etc
            })
    
            if (response.ok) {
                console.log("HEYYYYY IS OK!");
                const json = await response.json();

                console.log("prediction: ", json);

                return json;
            }
      
            setIsLoading(false);
          } catch (error) {
                console.log("FALSEEEE");
                setIsLoading(false);
            // Handle error if needed
          }
    }

    return { predict, setIsLoading }
}

export default usePredict
