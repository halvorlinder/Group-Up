import { Button, Container, Card, Row, CardGroup, width, Input, Label, Col, Option, Spinner } from "reactstrap";
import { fetchTags, fetchLocations } from "../../../utils/requests";
import AllGroupsList from "../../../components/allGroupsList";
import NavigationBar from "../../../components/navBar";
import React from "react";
import { useState, useEffect } from "react";

const FindGroups = () => {
  const [query, setQuery] = useState("");
  const [filterInfo, setFilterInfo] = useState({});
  const [filterFunction, setFilterFunction] = useState(null);
  const [locations, setLocations] = useState(null);
  const [locationMap, setLocationMap] = useState(null);
  const [tags, setTags] = useState(null);
  const [tagMap, setTagMap] = useState(null);

  const updateFilterInfo = (field, value) => {
    setFilterInfo({
      ...filterInfo,
      [field]: value,
    });
  };

  const applyFilters = (filterObject) => {
    console.log(filterInfo);
    setFilterFunction((group) => (group) => {
      return (
        (group.minimum_age && filterObject.age ? group.minimum_age >= filterObject.age : true) &&
        (filterObject.sizeMin || filterObject.sizeMax
          ? group.member_limit
            ? (filterObject.sizeMin ? filterObject.sizeMin <= group.member_limit : true) &&
              (filterObject.sizeMax ? filterObject.sizeMax >= group.member_limit : true)
            : false
          : true) &&
        (filterObject.location ? (group.location ? group.location.location_name == filterObject.location : false) : true) &&
        (filterObject.tag ? (group.tags ? group.tags.find((tag) => tag.tag_name == filterObject.tag) : false) : true) &&
        (filterObject.interest
          ? group.interests
            ? group.interests.find((interest) => interest.interest_name.toLowerCase() == filterObject.interest.toLowerCase())
            : false
          : true) &&
        (filterObject.start_date || filterObject.end_date
          ? group.activity_date
            ? (filterObject.start_date ? Date.parse(filterObject.start_date) < Date.parse(group.activity_date) : true) &&
              (filterObject.end_date ? Date.parse(filterObject.end_date) > Date.parse(group.activity_date) : true)
            : false
          : true)
      );
    });
  };

  useEffect(() => {
    fetchTags().then((data) => {
      setTags(data.tags);
      setTagMap(data.tagMap);
    });
    fetchLocations().then((data) => {
      setLocations(data.locations);
      setLocationMap(data.locationMap);
    });
  }, []);
  return !(tags && locations && tagMap && locationMap) ? (
    <Spinner></Spinner>
  ) : (
    <div className="" style={{ backgroundColor: "#f0f2f5" }}>
      <NavigationBar />
      <Container fluid style={{ margin: "10px", marginLeft: "0px" }}>
        <CardGroup className="p-4">
          <Card style={{ marginRight: "40px", borderRadius: "15px", border: "none", minWidth: "350px", maxWidth: "720px", border: "" }}>
            <AllGroupsList filterFunction={filterFunction} />
          </Card>

          {
            //Card that contains the whole filter view.
          }
          <Card
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              border: "none",
              minWidth: "300px",
              maxWidth: "350px",
              maxHeight: "700px",
              border: "",
            }}
          >
            <div style={{ margin: "20px", padding: "10px" }}>
              <h5 className="mb-4" style={{ fontWeight: "700" }}>
                Filtrer gruppene
              </h5>
              <Row>
                <Label>Aldersgrense</Label>
                <Input type="number" onChange={(e) => updateFilterInfo("age", e.target.value ? Number(e.target.value) : "")}></Input>
              </Row>
              <Row>
                <Label>Gruppest??rrelse</Label>
                <Col>
                  <Input
                    type="number"
                    placeholder="Nedre grense"
                    onChange={(e) => updateFilterInfo("sizeMin", e.target.value ? Number(e.target.value) : "")}
                  ></Input>
                </Col>
                <Col>
                  <Input
                    type="number"
                    placeholder="??vre grense"
                    onChange={(e) => updateFilterInfo("sizeMax", e.target.value ? Number(e.target.value) : "")}
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Label>Lokasjon</Label>
              </Row>
              <Row>
                <Input type="select" onChange={(e) => updateFilterInfo("location", e.target.value)}>
                  {[<option value={""}>Alle</option>].concat(locations.map((location) => <option value={location}>{locationMap[location]}</option>))}
                </Input>
              </Row>
              <Row>
                <Label>Tag</Label>
              </Row>
              <Row>
                <Input type="select" onChange={(e) => updateFilterInfo("tag", e.target.value)}>
                  {[<option value={""}>Alle</option>].concat(tags.map((tag) => <option value={tag}>{tagMap[tag]}</option>))}
                </Input>
              </Row>
              <Row>
                <Label>Interesse</Label>
              </Row>
              <Row>
                <Input type="text" placeholder="Interesse" onChange={(e) => updateFilterInfo("interest", e.target.value)}></Input>
              </Row>
              <Row>
                <Label>Dato for ??nsket aktivitet</Label>
              </Row>
              <Row>
                <Label>Fra</Label>
                <Input type="date" onChange={(e) => updateFilterInfo("start_date", e.target.value)}></Input>
                <Label>Til</Label>
                <Input type="date" onChange={(e) => updateFilterInfo("end_date", e.target.value)}></Input>
              </Row>
              <Button className="btn btn-dark mt-3" onClick={() => applyFilters(filterInfo)}>
                Filtrer
              </Button>
            </div>
          </Card>
        </CardGroup>
      </Container>
    </div>
  );
};

export default FindGroups;
