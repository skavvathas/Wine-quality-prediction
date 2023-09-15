import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { Input, Text } from '@chakra-ui/react';
import usePredict from "./hooks/usePredict"

interface WineState {
  volatile_acidity: number;
  citric_acid: number;
  residual_sugar: number;
  chlorides: number;
  free_sulfur_dioxide: number;
  total_sulfur_dioxide: number;
  density: number;
  pH: number;
  sulphates: number;
  alcohol: number;
  fixed_acidity: number;
  Type_Red_Wine: number;
  Type_White_Wine: number;
}

const initialWineState: WineState = {
  volatile_acidity: 0,
  citric_acid: 0,
  residual_sugar: 0,
  chlorides: 0,
  free_sulfur_dioxide: 0,
  total_sulfur_dioxide: 0,
  density: 0,
  pH: 3,
  sulphates: 0,
  alcohol: 0,
  fixed_acidity: 0,
  Type_Red_Wine: 0,
  Type_White_Wine: 0
};


function App() {
  const [wine, setWine] = useState<WineState>(initialWineState);
  const { predict, setIsLoading } = usePredict();
  const [predictedValue, setPredictedValue] = useState<string | number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setWine((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }

  const handlePredict = async() => {

    console.log(wine.volatile_acidity,
      wine.citric_acid,
      wine.residual_sugar,
      wine.chlorides,
      wine.free_sulfur_dioxide,
      wine.total_sulfur_dioxide,
      wine.density,
      wine.pH,
      wine.sulphates,
      wine.alcohol,
      wine.Type_Red_Wine,
      wine.Type_White_Wine);

    const prediction = await predict(
      wine.volatile_acidity,
      wine.citric_acid,
      wine.residual_sugar,
      wine.chlorides,
      wine.free_sulfur_dioxide,
      wine.total_sulfur_dioxide,
      wine.density,
      wine.pH,
      wine.sulphates,
      wine.alcohol,
      wine.Type_Red_Wine,
      wine.Type_White_Wine
    );


    console.log("The predicted value: ", prediction, prediction.predicted_quality);

    setPredictedValue(prediction.predicted_quality); 
  }

  useEffect(()=> {

  }, [predictedValue])

  return (
    <div className="App">
      Wine prediction

      <div className="input-group">
        <Text mb='8px'>Volatile acidity [Values: 0.01 - 1.6]:</Text>
        <Input
          name="volatile_acidity"
          value={wine.volatile_acidity}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Volatile acidity'
          size='sm'
        />

        <Text mb='8px'>Citric acid [Values: 0.00 - 1.7]:</Text>
        <Input
          name="citric_acid"
          value={wine.citric_acid}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Citric acid'
          size='sm'
        />

        <Text mb='8px'>Residual sugar [Values: 0.5 - 66]:</Text>
        <Input
          name="residual_sugar"
          value={wine.residual_sugar}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Residual sugar'
          size='sm'
        />

        <Text mb='8px'>Chlorides [Values: 0.001 - 1]:</Text>
        <Input
          name="chlorides"
          value={wine.chlorides}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Chlorides'
          size='sm'
        />

        <Text mb='8px'>Free sulfur dioxide [Values: 1.0 - 300]:</Text>
        <Input
          name="free_sulfur_dioxide"
          value={wine.free_sulfur_dioxide}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Free sulfur dioxide'
          size='sm'
        />

        <Text mb='8px'>Total sulfur dioxide [Values: 6.0 - 440.0]:</Text>
        <Input
          name="total_sulfur_dioxide"
          value={wine.total_sulfur_dioxide}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Total sulfur dioxide'
          size='sm'
        />
      </div>

      <div className="input-group">
        <Text mb='8px'>Density [0.9 - 1.1]:</Text>
        <Input
          name="density"
          value={wine.density}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Density'
          size='sm'
        />

        <Text mb='8px'>pH [Values: 2.5 - 4.2]:</Text>
        <Input
          name="ph"
          value={wine.pH}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Ph'
          size='sm'
        />

        <Text mb='8px'>Sulphates [Values: 0.20 - 2.0]:</Text>
        <Input
          name="sulphates"
          value={wine.sulphates}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Sulphates'
          size='sm'
        />

        <Text mb='8px'>Alcohol [Values: 8.0 - 15]:</Text>
        <Input
          name="alcohol"
          value={wine.alcohol}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Alcohol'
          size='sm'
        />

        <Text mb='8px'>Is Red Wine? [Values: 0 or 1 (0 if is not Red)]:</Text>
        <Input
          name="Type_Red_Wine"
          value={wine.Type_Red_Wine}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Type_Red_Wine'
          size='sm'
        />

        <Text mb='8px'>Is White Wine? [Values: 0 or 1]:</Text>
        <Input
          name="Type_White_Wine"
          value={wine.Type_White_Wine}
          onChange={handleChange}
          onKeyPress={(e) => {
            // Allow numbers, period (.) or comma (,), and some special keys like backspace and delete
            const validKeys = /^[0-9.,\b]+$/;
            if (!validKeys.test(e.key)) {
              e.preventDefault();
            }
          }}
          placeholder='Type_White_Wine'
          size='sm'
        />
      </div>

      <button onClick={handlePredict}>Predict wine quality</button>

      <h1>{predictedValue}</h1>

      
    </div>
  );
}

export default App;
