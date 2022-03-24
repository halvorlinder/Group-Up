import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  List,
  ListGroup,
  ListGroupItem,
  Navbar,
  Row,
  Spinner,
} from "reactstrap";
import { React, useEffect, useRef, useState } from "react";

import NavigationBar from "../../../components/navBar";
import { useRouter } from "next/router";

const superlikes = () => {
  const router = useRouter();
  const originalId = router.query["id"];

  const [groups, setGroups] = useState(null);

  if (typeof window !== "undefined") {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Token"),
      },
    };
  }

  function getImage(url) {
    if (url != null) {
      return "http://localhost:8000" + url;
    }
    return "https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
  }

  const getGroupData = (id) => {
    fetch(`http://localhost:8000/superlikes/` + id + "/", requestOptions)
      .then((res) => res.json())
      .then((groups) => {
        setGroups(groups);
      });
  };

  const goToGroup = (id) => {
    router.push("../../groupPage/" + originalId + "/otherGroup/"+id);
  };

  useEffect(() => {
    if (originalId) getGroupData(originalId);
  }, [originalId]);

  return (
    <>
      <NavigationBar></NavigationBar>
      {!groups ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h5>Gruppas superlikes</h5>
          <hr />
          <Row>
            {groups.map((group, i) => (
              <Col sm={3}>
                <Card style={{ margin: "10px", minWidth: "260px" }} onClick={() => goToGroup(group.id)}>
                  <CardImg alt="Card image cap" src={getImage(group.image)} top width="150px" />
                  <CardBody>
                    <CardTitle tag="h5">{group.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {group.expanded_members.length} medlemmer
                    </CardSubtitle>
                    <CardText>{group.description}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default superlikes;
