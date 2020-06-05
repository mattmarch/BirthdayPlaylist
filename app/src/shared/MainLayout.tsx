import React, { FunctionComponent } from "react";
import styled from "styled-components";

const MainLayout: FunctionComponent = (props) => (
  <PaddedCenteredContainer>
    <h1>Birthday Playlist Generator</h1>
    {props.children}
  </PaddedCenteredContainer>
);

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PaddedCenteredContainer = styled(CenteredContainer)`
    padding: 20px;
`

export default MainLayout;
