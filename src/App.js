// App.js
import React from 'react';
import { Container } from 'react-bootstrap';
 
import ExpressionForm from './ExpressionForm';

const App = () => {
  return (
    <Container className="mt-3">
      <h1>Expression Engine UI</h1>
      <ExpressionForm />
    </Container>
  );
};

export default App;

