import React, { useContext, useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { NameContext } from '../../../NameContext';

const Profile = () => {
  const { name } = useContext(NameContext);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const [aerobicExercise, setAerobicExercise] = useState('');
  const [strengthTraining, setStrengthTraining] = useState('');
  const [flexibilityTraining, setFlexibilityTraining] = useState('');
  const [balanceExercises, setBalanceExercises] = useState('');
  const [hiit, setHIIT] = useState('');
  const [lowImpactActivities, setLowImpactActivities] = useState('');
  const [sportsActivities, setSportsActivities] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Perform form validation and save user information
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Physical Activity:', physicalActivity);
    console.log('Aerobic Exercise:', aerobicExercise);
    console.log('Strength Training:', strengthTraining);
    console.log('Flexibility Training:', flexibilityTraining);
    console.log('Balance Exercises:', balanceExercises);
    console.log('HIIT:', hiit);
    console.log('Low-Impact Activities:', lowImpactActivities);
    console.log('Sports and Recreational Activities:', sportsActivities);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile, {name}!</Text>
      {step === 1 && (
        <View style={styles.stepContainer}>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.categoryTitle}>Physical Activity</Text>
          <TextInput
            placeholder="Aerobic/Cardiovascular Exercise"
            value={aerobicExercise}
            onChangeText={setAerobicExercise}
            style={styles.input}
          />
          <TextInput
            placeholder="Strength Training/Resistance Exercise"
            value={strengthTraining}
            onChangeText={setStrengthTraining}
            style={styles.input}
          />
          <TextInput
            placeholder="Flexibility Training"
            value={flexibilityTraining}
            onChangeText={setFlexibilityTraining}
            style={styles.input}
          />
          <TextInput
            placeholder="Balance and Stability Exercises"
            value={balanceExercises}
            onChangeText={setBalanceExercises}
            style={styles.input}
          />
          <Button title="Previous" onPress={handlePreviousStep} />
          <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.categoryTitle}>Physical Activity (contd.)</Text>
          <TextInput
            placeholder="High-Intensity Interval Training (HIIT)"
            value={hiit}
            onChangeText={setHIIT}
            style={styles.input}
          />
          <TextInput
            placeholder="Low-Impact Activities"
            value={lowImpactActivities}
            onChangeText={setLowImpactActivities}
            style={styles.input}
          />
          <TextInput
            placeholder="Sports and Recreational Activities"
            value={sportsActivities}
            onChangeText={setSportsActivities}
            style={styles.input}
          />
          <Button title="Previous" onPress={handlePreviousStep} />
          <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
      {step === 4 && (
        <View style={styles.stepContainer}>
          <Button title="Previous" onPress={handlePreviousStep} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  stepContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Profile;
