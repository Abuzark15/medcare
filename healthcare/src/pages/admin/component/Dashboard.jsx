import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <Row>
        <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <h4>Total Doctors</h4>
              <p>10</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <h4>Total Users</h4>
              <p>250</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card>
            <Card.Body>
              <h4>Total Appointments</h4>
              <p>120</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
