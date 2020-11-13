import { applyMiddleware } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./meetings.css";
import MeetingCard from "../../meetingCard/MeetingCard";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownValue: "All",
      appointments: [],
    };
  }

  componentDidMount() {
    var url = "http://localhost:9000/meetings/appointments";
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({"user_id" : "5f23951c7b297f01f21a1877"}),
      headers: { 'Content-Type': 'application/json' }
  };

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj.client)
        this.setState({appointments: [...obj.client.pending, ...obj.client.upcoming, ...obj.client.completed, ...obj.client.declined]})
      });
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  changeValue = (e) => {
    this.setState(
      {
        dropdownValue: e.target.innerText,
        dropdownOpen: !this.state.dropdownOpen,
      },
      () => console.log("DropDownValue: " + this.state.dropdownValue)
    );
  };

  render() {
    const appointments = this.state.appointments;
    const dropDownValue = this.state.dropdownValue;

    const filteredDropdown = appointments.filter(
      (appointment) =>
        appointment.color === dropDownValue || dropDownValue === "All"
    );

    return (
      <Container fluid>
        <Row className="title">
          <div class="profile-text">Meetings</div>
        </Row>

        <hr></hr>

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="secondary" outline>
            {this.state.dropdownValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.changeValue}>All</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Completed</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Pending</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Upcoming</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Denied</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {filteredDropdown.map((appointment) => (
          <MeetingCard appointment={appointment} />
        ))}
      </Container>
    );
  }
}

export default Meetings;
