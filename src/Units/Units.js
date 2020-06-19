import React, { Component } from "react";
import { Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import axios from "axios";

class Units extends Component {
  state = {
    units: [],
    newUnitsData: {
      unit_code: "",
      name_en: "",
      name_er: "",
      description_en: "",
      description_er: "",
      unit_type: ""
    },
    editUnitsData: {
      id: "",
      unit_code: "",
      name_en: "",
      name_er: "",
      description_en: "",
      description_er: "",
      unit_type: ""
    },
    show: false,
    editShow: false
  };

  componentWillMount() {
    this.refreshUnits();
  }

  handleClose() {
    this.setState({ show: !this.state.show });
  }
  handleShow() {
    this.setState({ show: !this.state.show });
  }
  handleCloseEdit() {
    this.setState({ editShow: !this.state.editShow });
  }
  handleShowEdit() {
    this.setState({ editShow: !this.state.editShow });
  }

  addUnit() {
    axios
      .post("http://localhost:3001/units", this.state.newUnitsData)
      .then(response => {
        let { units } = this.state;
        units.push(response.data);
        this.setState({
          units,
          show: false,
          newUnitsData: {
            unit_code: "",
            name_en: "",
            name_er: "",
            description_en: "",
            description_er: "",
            unit_type: ""
          }
        });
      });
  }

  updateUnit() {
    let {
      unit_code,
      name_en,
      name_er,
      description_er,
      unit_type
    } = this.state.editUnitsData;

    axios
      .put("http://localhost:3001/units/" + this.state.editUnitsData.id, {
        unit_code,
        name_en,
        name_er,
        description_er,
        unit_type
      })
      .then(response => {
        this.refreshUnits();
        this.setState({
          editShow: false,
          editUnitsData: {
            id: "",
            unit_code: "",
            name_en: "",
            name_er: "",
            description_en: "",
            description_er: "",
            unit_type: ""
          }
        });
      });
  }

  editUnit(id, unit_code, name_en, name_er, description_er, unit_type) {
    this.setState({
      editShow: !this.state.editShow,
      editUnitsData: {
        id,
        unit_code,
        name_en,
        name_er,
        description_er,
        unit_type
      }
    });
  }

  deleteUnit(id) {
    axios.delete("http://localhost:3001/units/" + id).then(resp => {
      this.refreshUnits();
    });
  }

  refreshUnits() {
    axios.get("http://localhost:3001/units").then(res => {
      this.setState({ units: res.data });
    });
  }

  render() {
    let units = this.state.units.map(unit => {
      return (
        <tr key={unit.id}>
          <td className="er">#{unit.unit_code}</td>
          <td className="en">{unit.name_en}</td>
          <td className="er">{unit.name_er}</td>
          <td className="er">{unit.description_er}</td>
          <td className="er">{unit.unit_type}</td>

          <td className="text-center action">
            <a
              href
              className="ml-3 primary"
              onClick={this.editUnit.bind(
                this,
                unit.id,
                unit.unit_code,
                unit.name_en,
                unit.name_er,
                unit.description_er,
                unit.unit_type
              )}
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>
            <a
              href
              variant="danger"
              onClick={this.deleteUnit.bind(this, unit.id)}
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </a>
            {/* <Button
              variant="primary"
              className="ml-3"
              onClick={this.editUnit.bind(
                this,
                unit.id,
                unit.unit_code,
                unit.name_en,
                unit.name_er,
                unit.description_er,
                unit.unit_type
              )}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={this.deleteUnit.bind(this, unit.id)}
            >
                      Delete
            </Button>
                   */}
          </td>
        </tr>
      );
    });

    return (
      <>
        <Row className="mt-5">
          <Col xs={12}>
            <p className="text-right table-title">الوحدات</p>
          </Col>
          <Col xs={12}>
            <Table hover>
              <thead>
                <tr>
                  <th>كود الخدمة</th>
                  <th>اسم الوحدة باللغة العربية</th>
                  <th>اسم الوحدة باللغة الانجليزية</th>
                  <th>وصف الحالة</th>
                  <th>النوع </th>
                  <th className="text-center">اجراء</th>
                </tr>
              </thead>
              <tbody>{units}</tbody>
            </Table>
          </Col>

          <Col xs={12}>
            <div className="text-right mt-3 add-unit">
              <Button variant="primary" onClick={this.handleShow.bind(this)}>
                اضافة وحدة جديدة
              </Button>
            </div>

            {/* Add New Modal */}
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Unit</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  {/* Unit Code */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Unit Code"
                      value={this.state.newUnitsData.unit_code}
                      onChange={e => {
                        let { newUnitsData } = this.state;
                        newUnitsData.unit_code = e.target.value;
                        this.setState({ newUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Unit Name In Engilsh */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Name English</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Unit Name In English"
                      value={this.state.newUnitsData.name_en}
                      onChange={e => {
                        let { newUnitsData } = this.state;
                        newUnitsData.name_en = e.target.value;
                        this.setState({ newUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Unit Name In Arabic */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Name Arabic</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Unit Name In Arabic"
                      value={this.state.newUnitsData.name_er}
                      onChange={e => {
                        let { newUnitsData } = this.state;
                        newUnitsData.name_er = e.target.value;
                        this.setState({ newUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Description In Arabic  */}
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description In Arabic</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={this.state.newUnitsData.description_er}
                      onChange={e => {
                        let { newUnitsData } = this.state;
                        newUnitsData.description_er = e.target.value;
                        this.setState({ newUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Unit Type */}
                  {/* <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Unit Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.newUnitsData.unit_type}
                      onChange={e => {
                        let { newUnitsData } = this.state;
                        newUnitsData.unit_type = e.target.value;
                        this.setState({ newUnitsData });
                      }}
                    >
                      <option>1</option>
                      <option>2</option>
                    </Form.Control>
                  </Form.Group>
                 */}

                  {/* Unit Type */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Unit type"
                      value={this.state.newUnitsData.unit_type}
                      onChange={e => {
                        let { newUnitsData } = this.state;
                        newUnitsData.unit_type = e.target.value;
                        this.setState({ newUnitsData });
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={this.handleClose.bind(this)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={this.addUnit.bind(this)}>
                  Add New Unit
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal
              show={this.state.editShow}
              onHide={this.handleCloseEdit.bind(this)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Unit</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  {/* Unit Code */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Unit Code"
                      value={this.state.editUnitsData.unit_code}
                      onChange={e => {
                        let { editUnitsData } = this.state;
                        editUnitsData.unit_code = e.target.value;
                        this.setState({ editUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Unit Name In Engilsh */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Name English</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Unit Name In English"
                      value={this.state.editUnitsData.name_en}
                      onChange={e => {
                        let { editUnitsData } = this.state;
                        editUnitsData.name_en = e.target.value;
                        this.setState({ editUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Unit Name In Arabic */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Name Arabic</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Unit Name In Arabic"
                      value={this.state.editUnitsData.name_er}
                      onChange={e => {
                        let { editUnitsData } = this.state;
                        editUnitsData.name_er = e.target.value;
                        this.setState({ editUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Description In Arabic  */}
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description In Arabic</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={this.state.editUnitsData.description_er}
                      onChange={e => {
                        let { editUnitsData } = this.state;
                        editUnitsData.description_er = e.target.value;
                        this.setState({ editUnitsData });
                      }}
                    />
                  </Form.Group>

                  {/* Unit Type */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Unit type"
                      value={this.state.editUnitsData.unit_type}
                      onChange={e => {
                        let { editUnitsData } = this.state;
                        editUnitsData.unit_type = e.target.value;
                        this.setState({ editUnitsData });
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={this.handleCloseEdit.bind(this)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={this.updateUnit.bind(this)}>
                  Update Unit
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Units;
