import React, { useState, Fragment } from 'react';
import './customStyle.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Education from './education';
import { Form, Input, Button, DatePicker, Typography, Icon } from 'antd';
const { Title } = Typography;
const { RangePicker } = DatePicker;

const Experience = ({ inputs, ref, handleSubmit, handleInputChange, onExpDateChange }) => {
  const [inputFields, setInputFields] = useState([
    {
      workTitle: '',
      companyName: '',
      companyLocation: '',
      employmentType: '',
      jobDescription: '',
      experienceDate: '',
    },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      workTitle: '',
      companyName: '',
      companyLocation: '',
      employmentType: '',
      jobDescription: '',
      experienceDate: '',
    });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div className="customStyle">
      <Title level={3}>Work experience</Title>
      <Form onSubmit={handleSubmit} autoComplete="off">
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <Form.Item label="Title">
              <Input
                placeholder=""
                name="workTitle"
                onChange={handleInputChange}
                value={inputs.workTitle}
              />
            </Form.Item>
            <Form.Item label="Company Name">
              <Input
                placeholder=""
                name="companyName"
                onChange={handleInputChange}
                value={inputs.companyName}
              />
            </Form.Item>
            <Form.Item label="Company Location">
              <Input
                placeholder=""
                name="companyLocation"
                onChange={handleInputChange}
                value={inputs.companyLocation}
              />
            </Form.Item>
            <Form.Item label="Employment type" autoComplete="on">
              <Input
                placeholder=""
                name="employmentType"
                onChange={handleInputChange}
                value={inputs.employmentType}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                placeholder=""
                name="jobDescription"
                onChange={handleInputChange}
                value={inputs.jobDescription}
              />
            </Form.Item>
            <Form.Item label="Date">
              <RangePicker onChange={onExpDateChange} name="experienceDate" />
            </Form.Item>
            <Form.Item>
              <Button
                type="dashed"
                style={{ width: '60%' }}
                onClick={() => handleRemoveFields(index)}
              >
                <Icon type="plus" /> Remove work
              </Button>
            </Form.Item>
          </Fragment>
        ))}
        <Form.Item>
          <Button type="dashed" style={{ width: '60%' }} onClick={() => handleAddFields()}>
            <Icon type="plus" /> Add work
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/auth/profile/education">
            <Button
              type="primary"
              onClick={() => {
                return (
                  <div>
                    <Route>
                      <Education />
                    </Route>
                  </div>
                );
              }}
            >
              Next
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Experience;
