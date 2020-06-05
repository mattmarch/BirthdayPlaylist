import React, { FunctionComponent } from "react";
import styled from "styled-components";

const MainLayout: FunctionComponent = (props) => (
  <CenteredContainer>
    <h1>Birthday Playlist Generator</h1>
    {props.children}
  </CenteredContainer>
);

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default MainLayout;
