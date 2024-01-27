 
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import './styles.css';  

const ExpressionForm = () => {
  const [expressions, setExpressions] = useState([{ ruleType: '', operator: '', value: '', score: '' }]);
  const [errors, setErrors] = useState([]);

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: '', operator: '', value: '', score: '' }]);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  const handleChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const validateForm = () => {
    const newErrors = [];
    expressions.forEach((expression, index) => {
      if (!expression.ruleType || !expression.operator || !expression.value || !expression.score) {
        newErrors.push(`Expression ${index + 1}: All fields are required.`);
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
       
      console.log('Valid expressions:', expressions);

      // Save data to JSON file
      saveToJsonFile();
    }
  };

  const saveToJsonFile = () => {
    const jsonData = {
      expressions: expressions,
    };
    const jsonString = JSON.stringify(jsonData, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="expression-form-container">
      <div className="form-container" style={{fontSize:'25px'}}>
        <Form>
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {expressions.map((expression, index) => (
            <Row key={index} className="mb-3 expression-row">
              {/* Dropdown for Rule Type */}
              <Col>
                <Form.Group>
                  <Form.Label>Rule:    </Form.Label>
                  <Form.Control
                    as="select"
                    value={expression.ruleType}
                    onChange={(e) => handleChange(index, 'ruleType', e.target.value)}
                  >
                    <option value="">Select Rule Type</option>
                    <option value="Age">Age</option>
                    <option value="Credit Score">Credit Score</option>
                    <option value="Account Balance">Account Balance</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Input for Operator */}
              <Col>
                <Form.Group>
                  <Form.Label>Operator:    </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Operator"
                    value={expression.operator}
                    onChange={(e) => handleChange(index, 'operator', e.target.value)}
                  />
                </Form.Group>
              </Col>

              {/* Input for Value */}
              <Col>
                <Form.Group>
                  <Form.Label>Value:     </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Value"
                    value={expression.value}
                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                  />
                </Form.Group>
              </Col>

              {/* Input for Score */}
              <Col>
                <Form.Group>
                  <Form.Label>Score:   </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Score"
                    value={expression.score}
                    onChange={(e) => handleChange(index, 'score', e.target.value)}
                  />
                </Form.Group>
              </Col>

              {/* Button to Delete Expression */}
              <Col xs="auto">
                <Button variant="danger" onClick={() => handleDeleteExpression(index)}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}

          {/* Button to Add Expression */}
          <Button variant="primary" onClick={handleAddExpression} className="expression-row">
            Add Expression
          </Button>

          {/* Button to Submit Form */}
          <div className="buttons-container">
            <Button variant="success" onClick={handleSubmit} className="submit-button">
              Submit
            </Button>
             

            {/* Add some styling to the Delete button */}
            <Button variant="danger" className="delete-button" onClick={() => handleDeleteExpression(0)}>
              DeleteExpression
            </Button>
             
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ExpressionForm;





