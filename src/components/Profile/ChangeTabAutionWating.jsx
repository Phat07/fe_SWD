import PropTypes from "prop-types";
import React, { useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";

const ChangeTabAutionWating = (props) => {
  const { chuaDienRaContent, sapDienRaContent, dangDienRaContent } = props;
  const [activeTab, setActiveTab] = useState("chuaDienRa");

  return (
    <Tab.Container
      id="left-tabs-example"
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
    >
      <Nav variant="pills" className="flex-row mb-3">
        <Nav.Item>
          <Nav.Link eventKey="chuaDienRa">
            {/* <CIcon icon={cilMediaPlay} className="me-2" /> */}
            Chưa diễn ra
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sapDienRa">
            {/* <CIcon icon={cilMediaPlay} className="me-2" /> */}
            Sắp diễn ra
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="dangDienRa">
            {/* <CIcon icon={cilMediaPlay} className="me-2" /> */}
            Đang diễn ra
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="chuaDienRa">{chuaDienRaContent}</Tab.Pane>
        <Tab.Pane eventKey="sapDienRa">{sapDienRaContent}</Tab.Pane>
        <Tab.Pane eventKey="dangDienRa">{dangDienRaContent}</Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

ChangeTabAutionWating.propTypes = {
  chuaDienRaContent: PropTypes.node,
  sapDienRaContent: PropTypes.node,
  dangDienRaContent: PropTypes.node,
  daDienRaContent: PropTypes.node,
};

export default React.memo(ChangeTabAutionWating);
