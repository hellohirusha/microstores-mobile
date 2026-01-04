import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/api';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const token = await registerUser(email, password, role);
      login(token);
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 8, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 8, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Role (buyer/seller)" value={role} onChangeText={setRole} style={{ marginBottom: 8, borderWidth: 1, padding: 8 }} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
